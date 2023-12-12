import type { LayoutServerLoad } from './$types';
import { updateCoachInfo } from '~/lib/utils';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const spartaApi = locals.spartaApi;

	const [
		coaches,
		structures,
		rooms,
		disciplines,
		products,
		clients,
		prospects,
		signedClients
	] = await Promise.all([
		spartaApi.coaches.listFiltered(),
		spartaApi.structures.list(),
		spartaApi.rooms.list(),
		spartaApi.disciplines.list(),
		spartaApi.products.list(),
		spartaApi.clients.list(),
		spartaApi.clients.getByKey_referent_and_state(
			locals.user?.data?.coach_id,
			0
		),
		spartaApi.clients.getByKey_referent_and_state(
			locals.user?.data?.coach_id,
			1
		)
	]);

	const prospectionEventsByClient = await Promise.all(
		prospects.map((client) =>
			spartaApi.clients_prospects.getFilteredByKey_client(client.id)
		)
	);

	const prospectsHappenings = prospectionEventsByClient.flat();

	// RECUPERATION DES PROSPECTS QUI ONT UN STATE 3 (date de bilan positionnee)
	const updatedStates = prospectsHappenings.filter((obj) => obj.state === 3);

	// ON REMPLACE LES INDEXS DE KEY_REFERENT ET PROSPECT_SOURCE PAR LEUR LABEL
	const states = prospects.map((client) =>
		updateCoachInfo(client, coaches, updatedStates)
	);

	const qualifiers = await spartaApi.qualifiersApi.listFiltered();

	return {
		user: locals.user,
		structures,
		rooms,
		disciplines,
		products,
		coaches,
		clients,
		prospects,
		states,
		signedClients,
		qualifiers
	};
};
