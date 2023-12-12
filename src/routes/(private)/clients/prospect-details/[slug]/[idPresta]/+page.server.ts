import { IdsExtractor, arrayMerger } from '~/lib/api-sdk/utils';
import type { PageServerLoad } from './$types';
import { SpartaApi, getSpartaApi } from '~/lib/api-sdk';
import { json } from '@sveltejs/kit';

export const load = (async ({ params, locals, setHeaders }) => {
	const spartaApi = getSpartaApi(locals.user.token);
	const clientSlug = Number(params.slug);
	const idPresta = Number(params.idPresta);

	const [coaches, client, clientsEvents] = await Promise.all([
		spartaApi.coaches.listFiltered(),
		spartaApi.clients.getFiltered(clientSlug),
		spartaApi.clients_events.getFilteredByKey_client_event(clientSlug)
	]);

	const filteredClientsEvents = clientsEvents.filter(
		(clientEvent) => clientEvent.key_presta === idPresta
	);
	const eventsList = await IdsExtractor(filteredClientsEvents, 'key_event');
	const eventsForAClient = await Promise.all(
		eventsList.map((event) => spartaApi.events.getFiltered(event))
	);
	const flatEventsForAClient = eventsForAClient.flat();
	const getReady = arrayMerger(
		clientsEvents,
		flatEventsForAClient,
		'key_event',
		'id'
	);

	return {
		clientsEvents,
		eventsList,
		eventsOfClient: flatEventsForAClient,
		getReady,
		coaches,
		client,
		slugs: {
			keyClient: params.slug,
			keyPresta: params.idPresta
		}
	};
}) satisfies PageServerLoad;
