import { formatDate } from '~/lib/utils';
import type { PageServerLoad } from './$types';
import { getSpartaApi } from '~/lib/api-sdk';

export const load: PageServerLoad = (async ({ params, locals }) => {
	const spartaApi = getSpartaApi(locals.user?.token);
	const key_client = parseInt(params.slug, 10);

	const fetchClientsInfos = () => spartaApi.clients.getFiltered(params.slug);
	const fetchClientsEvents = () =>
		spartaApi.clients_events.getFilteredByKey_client_event(params.slug);
	const fetchTodaysEvents = () =>
		spartaApi.events.getFilteredByDateAndCoach(
			formatDate(new Date()),
			locals.user?.data?.coach_id
		);

	try {
		const [clientsInfos, clientsEvents, todaysEvents] = await Promise.all([
			fetchClientsInfos(),
			fetchClientsEvents(),
			fetchTodaysEvents()
		]);

		const filteredEvents = clientsEvents
			.map((item) => todaysEvents.find((event) => event.id === item.key_event))
			.filter(Boolean);

		return {
			clientsInfos,
			clientsEvents,
			filteredEvents
		};
	} catch (error) {
		console.error('Critical error', error); // handle error
		return {};
	}
}) satisfies PageServerLoad;
// };

// export const actions: Actions = {

// 	default: async ({ request }) => {
// 		const spartaApi = new SpartaApi();

// 		const spartaApi = new SpartaApi();

// 		try {
// 			const formData = await request.formData();

// 			// Extract and process data
// 			const date = formData.get('date');
// 			const startTime = convertTimeToSeconds(formData.get('startTime'));
// 			const endTime = convertTimeToSeconds(formData.get('endTime'));
// 			const duration = endTime - startTime;
// 			const coachId = formData.get('key_coach');
// 			const roomId = formData.get('key_room');
// 			const clientId = formData.get('key_client');
// 			const eventId = formData.get('eventId');

// 			// Validate data
// 			if (!date || !startTime || !endTime || !coachId || !roomId || !clientId) {
// 				throw new Error('Il manque du fields');
// 			}

// 			// Create or update event
// 			const eventData = {
// 				date,
// 				startTime,
// 				duration,
// 				coachId,
// 				roomId,
// 				clientId
// 			};
// 			let response;

// 			if (eventId) {
// 				response = await spartaApi.events.updateOne(eventId, eventData);
// 			} else {
// 				response = await spartaApi.events.createOne(eventData);
// 			}
// 			const formData = await request.formData();

// 			// Extract and process data
// 			const date = formData.get('date');
// 			const startTime = convertTimeToSeconds(formData.get('startTime'));
// 			const endTime = convertTimeToSeconds(formData.get('endTime'));
// 			const duration = endTime - startTime;
// 			const coachId = formData.get('key_coach');
// 			const roomId = formData.get('key_room');
// 			const clientId = formData.get('key_client');
// 			const eventId = formData.get('eventId');

// 			// Validate data
// 			if (!date || !startTime || !endTime || !coachId || !roomId || !clientId) {
// 				throw new Error('Il manque du fields');
// 			}

// 			// Create or update event
// 			const eventData = {
// 				date,
// 				startTime,
// 				duration,
// 				coachId,
// 				roomId,
// 				clientId
// 			};
// 			let response;

// 			if (eventId) {
// 				response = await spartaApi.events.updateOne(eventId, eventData);
// 			} else {
// 				response = await spartaApi.events.createOne(eventData);
// 			}

// 			return {
// 				status: 200,
// 				body: {
// 					success: true,
// 					message: eventId ? 'Scéance mise a jour ! ' : 'Scéance  creé',
// 					event: response
// 					message: eventId ? 'Scéance mise a jour ! ' : 'Scéance  creé',
// 					event: response
// 				}
// 			};
// 		} catch (error) {
// 			console.error(error);
// 			return {
// 				status: 500,
// 				body: {
// 					success: false,
// 					message: error.message || 'An error occurred'
// 					message: error.message || 'An error occurred'
// 				}
// 			};
// 		}
// 	}
// };

function convertTimeToSeconds(t) {
	if (!t) return 0;
	const [hours, minutes] = t.split(':').map(Number);
	return hours * 3600 + minutes * 60;
}
