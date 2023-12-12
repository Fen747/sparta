import { SpartaApi, getSpartaApi } from './api-sdk';
import type {
	Clients,
	ClientsEvents,
	ClientsProspects,
	Coaches
} from './api-sdk/types';

export function CapitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sessionsWarning(sessionsLeft: number, sessionsBought: number) {
	return sessionsBought - sessionsLeft;
}

/**
 * @param seconds
 * @param displaySeconds
 * @returns
 * Utils to convert the API time data in seconds to hours, minutes and seconds
 */
export function secondsToTime(
	seconds: number,
	displaySeconds: boolean = false
) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds - hours * 3600) / 60);
	const secondsLeft = seconds - hours * 3600 - minutes * 60;
	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}${
		displaySeconds ? `:${secondsLeft.toString().padStart(2, '0')}` : ''
	}`;
}

export function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedDay = day < 10 ? `0${day}` : day;

	return `${year}-${formattedMonth}-${formattedDay}`;
}

export function convertToSecondsFromMidnight(time: string) {
	const [hours, minutes] = time.split(':').map((part) => parseInt(part, 10));
	return hours * 3600 + minutes * 60;
}

export function updateCoachInfo(
	client: Clients,
	coaches: Coaches[],
	updatedStates: ClientsProspects[] = []
) {
	const findCoachById = (id) =>
		coaches.find((coach) => coach.id === id) || {
			firstname: 'Non',
			name: 'renseigné'
		};

	const coach = findCoachById(client.key_referent);
	const source = findCoachById(client.prospect_source);

	const state =
		updatedStates.length > 0 &&
		updatedStates.find((item) => item.key_client === client.id)
			? true
			: false;

	return {
		...client,
		key_referent: `${coach?.firstname} ${coach?.name} `,
		prospect_source: `${source?.firstname} ${source?.name}`,
		state: state
	};
}

export async function getSeanceBilan(client_id: number, spartaApi: SpartaApi) {
	try {
		const result = await spartaApi.clients_events.getFilteredByKey_client_event(
			client_id
		);

		if (result.length === 0) return [];

		const filteredResult = result.filter((item) => item.key_presta === 296);

		if (filteredResult.length === 0) return [];

		const seanceBilanDetails = await spartaApi.events.getFiltered(
			filteredResult[0].key_event
		);
		const [seanceBilanDetailsObject] = seanceBilanDetails;

		return seanceBilanDetailsObject || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function logAxiosError(error: any) {
	console.log('Error Message:', error.message);
	if (error.response) {
		// The request was made and the server responded with a status code
		console.log('Data:', error.response.data);
		console.log('Status:', error.response.status);
		console.log('Headers:', error.response.headers);
	} else if (error.request) {
		// The request was made but no response was received
		console.log('Request:', error.request);
	} else {
		// Something happened in setting up the request
		console.log('Error:', error.message);
	}
}
