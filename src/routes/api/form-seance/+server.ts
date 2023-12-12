import type { RequestHandler } from '@sveltejs/kit';
import { SpartaApi } from '~/lib/api-sdk';
import { json } from '@sveltejs/kit';
import type { Events } from '~/lib/api-sdk/types';

const fields = [
	'key_disc',
	'key_product',
	'duration',
	'type',
	'state',
	'date',
	'infos',
	'specifics',
	'time',
	'key_coach',
	'key_room',
	'eventId'
];

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const formData = await request.formData();

		// TODO: handle NaN cases
		const eventPayload: Events = {
			key_disc: Number(formData.get('key_disc')),
			key_product: Number(formData.get('key_product')),
			duration: Number(formData.get('duration')),
			type: 1, //Number(formData.get('type')),
			state: 1, //Number(formData.get('state')),
			date: `${formData.get('date')}`,
			infos: `${formData.get('infos')}`,
			specifics: 1, //Number(formData.get('specifics')),
			time: Number(formData.get('time')),
			key_coach: Number(formData.get('key_coach')),
			key_room: Number(formData.get('key_room')),
			id: Number(formData.get('eventId')),
			clients_events: [
				{
					key_client: Number(formData.get('key_client')),
					key_presta: Number(formData.get('key_presta')),
					attendance: Number(formData.get('attendance'))
				}
			]
		};

		// Validation des données
		if (
			Object.values(eventPayload).some(
				(value) => value === null || value === undefined
			)
		) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		if (Number(eventPayload.duration) <= 0) {
			return json({ error: 'invalid duration' }, { status: 400 });
		}

		// Traitement de la session sur SpartaApi
		const spartaApi = new SpartaApi(locals.user?.token);
		let response;

		if (eventPayload.id) {
			// TODO
			response = await spartaApi.events.updateOne(eventId, {
				date,
				startTime,
				endTime,
				coachId,
				keyRoom
			});
		} else {
			response = await spartaApi.events.createOne(eventPayload);
		}

		return json({ success: true, response });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
};
