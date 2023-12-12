import { writable } from 'svelte/store';

interface Client {
	// ...
}

interface Event {
	// ...
}

interface Coach {
	id: string;
}

interface StoreState {
	keyCoach: string | null;
	keyClient: string | null;
	clients: Client[];
	events: Event[];
}
//reset sur le filter l'initial state =>
const initialState: StoreState = {
	keyCoach: null,
	keyClient: null,
	clients: [],
	events: []
};

export const FilterCalendar = writable(initialState);
// Fonction pour réinit le store
export const resetFilter = () => {
	FilterCalendar.set(initialState);
};
