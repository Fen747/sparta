// import { writable } from 'svelte/store';
// import { SpartaApi } from '../api-sdk';

// const spartaApi =getSpartaApi();

// export const clientsGroupedByCoaches = writable([]);

// // Fetch coaches and clients data
// const fetchCoaches = spartaApi.coaches.list();
// const fetchClients = spartaApi.clients.list();

// Promise.all([fetchCoaches, fetchClients])
// 	.then(([coaches, clients]) => {
// 		const grouped = coaches.map((coach) => {
// 			return {
// 				coach,
// 				clients: clients.filter(
// 					(client) => client.key_coach === coach.key_client
// 				) // Assuming each client has a 'coachId' property
// 			};
// 		});

// 		clientsGroupedByCoaches.set(grouped);
// 	})
// 	.catch((error) => {
// 		// Handle errors, e.g., clientsGroupedByCoaches.set([]) or show an error message
// 		console.error('Error fetching data:', error);
// 	});
