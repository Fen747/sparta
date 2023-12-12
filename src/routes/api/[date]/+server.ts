import { type RequestHandler } from '@sveltejs/kit';
import { SpartaApi, getSpartaApi } from '$lib/api-sdk/index';

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

export const GET: RequestHandler = async ({ params, request, locals }) => {
	const { date } = params;
	const spartaApi = getSpartaApi(locals.user?.token);
	const url = new URL(request.url);
	const keyCoach = url.searchParams.get('keyCoach');
	const keyClient = url.searchParams.get('keyClient');

	try {
		let events;
		if (keyClient) {
			events = await spartaApi.events.getEventsByClientId(keyClient);
			events = events.filter(
				(event) =>
					event.key_coach.toString() === keyCoach && event.date === date
			);
		} else {
			// Fetch events based on coach
			events = await spartaApi.events.getFilteredByDateAndCoach(
				date as string,
				keyCoach
			);
		}

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
					clientsEvents: clientsDetails
				};
			})
		);

		const flattenedEvents = restructureEventsData(eventsWithDetails);

		return new Response(JSON.stringify({ events: flattenedEvents }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Error details:', error.message);
		// Log the full error if needed
		console.error(error);

		return new Response(
			JSON.stringify({
				error: 'Erreur lors de la récupération des événements',
				errorMessage: error.message // Optionally send error message to client for debugging
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
};
