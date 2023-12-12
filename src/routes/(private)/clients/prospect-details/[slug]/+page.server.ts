import { goto } from '$app/navigation';
import type { PageServerLoad } from './$types';
import { SpartaApi, getSpartaApi } from '~/lib/api-sdk';
import type { Clients } from '~/lib/api-sdk/types';
import {
	formatDate,
	convertToSecondsFromMidnight,
	getSeanceBilan
} from '~/lib/utils';

const date = formatDate(new Date());
let client: Clients;

export const load = (async ({ params, locals }) => {
	const spartaApi = getSpartaApi(locals.user.token);
	const [
		client,
		qualifiers,
		rooms,
		disciplines,
		clients_events,
		clients_prestas,
		prospectEvents
	] = await Promise.all([
		spartaApi.clients.getFiltered(Number(params.slug)),
		spartaApi.qualifiersApi.listFiltered(),
		spartaApi.rooms.listFiltered(),
		spartaApi.disciplines.listFiltered(),
		spartaApi.clients_events.getKey_client_event(Number(params.slug)),
		spartaApi.clients_prestas.getKey_client_prestas(Number(params.slug)),
		spartaApi.clients_prospects.getFilteredByKey_client(Number(params.slug))
	]);
	const states = qualifiers.prospectState.at_lbl.map((state, index) => ({
		label: state,
		value: index
	}));
	const coach = await spartaApi.coaches.getFiltered(client[0].key_referent);

	const seanceBilanSchedule = await getSeanceBilan(
		Number(params.slug),
		spartaApi
	);

	return {
		client,
		coach: coach,
		prospectEvents: prospectEvents,
		stateOptions: states,
		prestas: clients_prestas,
		events: clients_events,
		bilanDetails: seanceBilanSchedule,
		rooms,
		disciplines,
		clients_events
	};
}) satisfies PageServerLoad;

export const actions = {
	stateUpdate: async ({ request, locals, params }) => {
		try {
			const spartaApi = getSpartaApi(locals.user.token);
			const data = await request.formData();
			const client = await spartaApi.clients.getFiltered(params.slug);
			const test = Object.fromEntries(data.entries());
			const userData = {
				id: 666,
				key_client: client[0].id,
				date: date,
				date_recall: date,
				state: Number(test.newState)
			};

			const result = await spartaApi.clients_prospects.createOne(userData);
		} catch (error) {
			console.error(error);
		}
	},

	updateDetails: async ({ request, locals, params }) => {
		try {
			const spartaApi = getSpartaApi(locals.user.token);

			const client = await spartaApi.clients.getFiltered(params.slug);

			const data = await request.formData();

			const restructuredData = Object.fromEntries(data.entries());

			const userData = {
				id: client[0].id,
				firstname: client[0].firstname,
				name: client[0].name,
				email: restructuredData.email,
				phone_mobile: restructuredData.phone_mobile,
				key_str: Number(restructuredData.key_str),
				key_referent: Number(restructuredData.key_referent),
				infos: restructuredData.infos,
				state: client[0].state === 'Prospect' ? 0 : 1
			};

			const result = await spartaApi.clients.updateOne(userData.id, userData);

			if (result.success === true) {
				return {
					status: 200,
					body: {
						success: true,
						message: 'Update successful',
						result
					}
				};
			} else {
				return {
					status: 400,
					body: {
						success: false,
						message: 'Update failed',
						result
					}
				};
			}
		} catch (error) {
			console.error(error);
		}
	},

	seanceBilan: async ({ request, locals, params }) => {
		try {
			const data = await request.formData();
			const spartaApi = getSpartaApi(locals.user.token);
			const client = await spartaApi.clients.getFiltered(params.slug);
			const restructuredData = Object.fromEntries(data.entries());

			const startTime = convertToSecondsFromMidnight(
				restructuredData.startTime
			);

			const userData = {
				date: restructuredData.date,
				time: startTime,
				key_disc: 80,
				duration: 3600,
				key_product: 833,
				key_coach: Number(restructuredData.coach_id),
				key_str: Number(restructuredData.structure_id),
				key_room: Number(restructuredData.room_id),
				state: 1,
				type: 1,
				specifics: 3,
				infos: ''
			};

			const result = await spartaApi.events.createOne(userData);
			if (result.success === true) {
				const userDataUpdated = {
					key_client: client[0].id,
					state: 3,
					date: date,
					date_recall: date
				};
				const updateState = await spartaApi.clients_prospects.createOne(
					userDataUpdated
				);
				const clientEventUserData = {
					key_event: result.id,
					key_client: client[0].id,
					attendance: 0,
					count: 1,
					events: 1
				};
				const createClientEvent = await spartaApi.clients_events.createOne(
					clientEventUserData
				);

				return {
					status: 200,
					body: {
						success: true,
						message: 'event created',
						result
					}
				};
			}
		} catch (error) {
			console.error(error);
		}
	}
};
