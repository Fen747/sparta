import type { ApiResponse, Clients } from './types';
import { SpartaApi, getSpartaApi } from '.';
import { formatDate } from '../utils';

const spartaApi = getSpartaApi();
const today = new Date();
const formattedDate = formatDate(today);

export const arrayMerger = <T, U>(
	arr1: T[],
	arr2: U[],
	key1: keyof T,
	key2: keyof U
) => {
	const result: Record<string | number, T | U> = {};

	arr1.forEach((item) => {
		const keyValue = item[key1] as unknown as string | number;
		result[keyValue] = { ...item };
	});

	arr2.forEach((item) => {
		const keyValue = item[key2] as unknown as string | number;
		if (result[keyValue]) {
			result[keyValue] = { ...result[keyValue], ...item };
		} else {
			result[keyValue] = { ...item };
		}
	});

	return Object.values(result);
};

export async function fetchAndProcess<T, U>(
	ids: number[],
	fetchDetails: (id: number) => Promise<U>
): Promise<T[]> {
	try {
		if (!Array.isArray(ids)) {
			console.error('Error: IDs response is not an array');
			return [];
		}

		const fetchedDetails: (U | null)[] = await Promise.all(
			ids.map(async (id) => {
				try {
					const result = await fetchDetails(id);
					return result;
				} catch (error) {
					console.error(`API call error for ID: ${id}`, error);
					return null;
				}
			})
		);
		return fetchedDetails.filter((detail): detail is T => detail !== null);
	} catch (error) {
		console.error('Error in fetching and processing:', error);
		return [];
	}
}

export async function IdsExtractor<T>(
	data: T[],
	key: keyof T
): Promise<number[]> {
	try {
		const extractedIds: number[] = data.map((item) => item[key] as number);
		return extractedIds;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export const createNewProspect = async (
	data: Clients,
	spartaApi: SpartaApi
): Promise<ApiResponse | void> => {
	try {
		const createClient = await spartapi.clients.createAClient({
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
