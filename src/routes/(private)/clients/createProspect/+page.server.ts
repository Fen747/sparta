import { getSpartaApi } from '~/lib/api-sdk';
import type { PageServerLoad } from './$types';
import type { Clients } from '~/lib/api-sdk/types';
import { createNewProspect } from '~/lib/api-sdk/utils';

const transformFormDataToClients = (formData: FormData): Clients => {
	const entries = Array.from(formData.entries());
	const clientsData: any = {};

	entries.forEach(([key, value]) => {
		if (
			key === 'key_str' ||
			key === 'key_referent' ||
			key === 'provenance' ||
			key === 'prospect_source' ||
			key === 'key_referent'
		) {
			clientsData[key] = Number(value);
		} else {
			clientsData[key] = value;
		}
	});

	return clientsData as Clients;
};

export const actions = {
	default: async ({ request, locals }) => {
		const spartaApi = getSpartaApi(locals.user.token);
		const createNewProspect = async (
			data: Clients
		): Promise<ApiResponse | void> => {
			try {
				const createClient = await spartaApi.clients.createAClient({
					firstname: data.firstname,
					name: data.name,
					email: data.email,
					phone_mobile: data.phone_mobile,
					key_str: data.key_str,
					key_referent: data.key_referent,
					prospect_source: data.prospect_source
				});
				if (createClient.success !== true) {
					console.error('Error creating the client');
					return;
				}
				const createProspect =
					await spartaApi.clients_prospects.createInitialProspectEvent({
						key_client: createClient.id,
						state: 0,
						provenance: data.provenance
						// Date: formattedDate
					});
				if (createProspect.success !== true) {
					console.error('The prospect could not be created');
					return;
				}
			} catch (error) {
				console.error(`Error creating the new client: ${error}`);
				return;
			}
		};

		try {
			const data = await request.formData();
			const userData = transformFormDataToClients(data);

			const result = await createNewProspect(userData);

			return {
				status: 200,
				body: {
					success: true,
					message: 'Prospect was successfully created',
					result
				}
			};
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				body: {
					success: false,
					message: error
				}
			};
		}
	}
};

export const load = (async () => {
	return;
}) satisfies PageServerLoad;
