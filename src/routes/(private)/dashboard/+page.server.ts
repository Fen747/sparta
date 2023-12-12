import type { PageServerLoad } from './$types';
import { getSpartaApi } from '$lib/api-sdk/index';

const restructureEventsData = (events) => {
	return events
		.map((event) => {
			return event.clientsEvents.map((clientEvent) => {
				return {
					...event,
					...clientEvent,
					clientInfo: clientEvent.clientInfo[0]
				};
			});
		})
		.flat();
};

export const load: PageServerLoad = async ({ locals }) => {
	const coachId = locals.user?.data?.coach_id;

	const coachName = locals.user?.data?.coach_name;

	const spartaApi = getSpartaApi(locals.user?.token);

	if (coachId) {
		const today = new Date().toISOString().split('T')[0];

		const events = await spartaApi.events.getFilteredByDateAndCoach(
			today,
			parseInt(coachId)
		);

		const eventsWithDetails = await Promise.all(
			events.map(async (event) => {
				const clientsEvents =
					await spartaApi.clients_events.getFilteredByKey_event(event.id);

				const clientsDetails = await Promise.all(
					clientsEvents.map(async (clientEvent) => {
						const clientInfo = await spartaApi.clients.get(
							clientEvent.key_client
						);
						return {
							...clientEvent,
							clientInfo
						};
					})
				);

				return {
					...event,
					clientsEvents: clientsDetails,
					coachName
				};
			})
		);

		const flattenedEvents = restructureEventsData(eventsWithDetails);

		// Fetch prospects by coach
		let coachProspects = [];
		try {
			coachProspects = await spartaApi.clients.getByKey_referent(
				parseInt(coachId)
			);
		} catch (error) {
			console.error('propect =>:', error);
		}

		return {
			events: flattenedEvents,
			coachId,
			coachName,
			prospects: coachProspects
		};
	} else {
		return {
			events: [],
			eventDetails: {},
			prospects: []
		};
	}
};
