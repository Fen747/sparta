import { IdsExtractor, arrayMerger } from '~/lib/api-sdk/utils';
import type { PageServerLoad } from './$types';
import { SpartaApi, getSpartaApi } from '~/lib/api-sdk';

const spartapi = getSpartaApi();

export const load = (async ({ params }) => {
	const clientsEvents =
		await spartapi.clients_events.getFilteredByKey_client_event(
			Number(params.slug)
		);

	const eventsList = await IdsExtractor(clientsEvents, 'key_event');

	async function getEventsOfAClient(eventsList: []) {
		const events = [];

		for (const event of eventsList) {
			const temporary = await spartapi.events.getFiltered(event);
			events.push(temporary);
		}

		return events;
	}

	const eventsForAClient = await getEventsOfAClient(eventsList);
	const flatEventsForAClient = eventsForAClient.flat();

	const getReady = arrayMerger(
		clientsEvents,
		flatEventsForAClient,
		'key_event',
		'id'
	);
	const coaches = await spartapi.coaches.listFiltered();
	const client = await spartapi.clients.getFiltered(Number(params.slug));
	return {
		clientsEvents: clientsEvents,
		eventsList: eventsList,
		eventsOfClient: flatEventsForAClient,
		getReady: getReady,
		coaches: coaches,
		client: client
	};
}) satisfies PageServerLoad;
