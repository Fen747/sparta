import { writable } from 'svelte/store';
import { SpartaApi, getSpartaApi } from '$lib/api-sdk/index';
import type { Structures, Rooms } from '$lib/api-sdk/types';

const createDataStore = () => {
	const initialState = {
		structures: [] as Structures[],
		rooms: [] as Rooms[]
	};

	const { subscribe, set, update } = writable(initialState);

	let interval: any;

	const fetchData = async () => {
		const spartaApi = getSpartaApi();
		try {
			const structures = await spartaApi.structures.list();
			const rooms = await spartaApi.rooms.list();
			set({ structures, rooms });
		} catch (error) {
			// console.error('Error :', error);
		}
	};

	return {
		subscribe,
		initialize: () => {
			fetchData();
			interval = setInterval(fetchData, 3600000); // Fetch toutes les hour
		},
		stop: () => {
			clearInterval(interval);
		}
	};
};

export const dataStore = createDataStore();
