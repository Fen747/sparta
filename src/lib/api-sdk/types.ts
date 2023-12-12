export interface Document {
	id: number;
}

export interface ApiResponse extends Document {
	success: boolean;
	message: string;
}

export interface Events extends Document {
	id: number;
	key_disc: number;
	key_room: number;
	key_coach: number;
	key_product: number;
	date: string;
	time: number;
	duration: number;
	state: number;
	type: number;
	specifics: number;
	infos: string;
	clients_events?: {
		key_client: number;
		key_presta: number;
		attendance: number;
	}[];
}
export interface Clients extends Document {
	id: number;
	firstname: string;
	name: string;
	civility: number;
	sex: number;
	birthday_date: string; // Assuming this is a date string, "0000-00-00" indicates a placeholder or unknown date
	state: number | string;
	add1: string;
	add2: string;
	cp: string; // Assuming this is postal code which can be alphanumeric in some countries
	city: string;
	country: string;
	email: string;
	phone_mobile: string;
	infos: string;
	profession: string;
	key_prospect: number;
	key_referent: number;
	key_str: number;
	prospect_source: number | string;
	prospect_source_txt: string;
	clientState: string;
}
export interface Qualifiers extends Document {
	[key: string]: any;
}

export interface Structures extends Document {
	id: number;
	label: string;
	is_active: boolean;
	sigle: string;
	colors: {
		stroke: string;
		fill: string;
	};
}

export interface Rooms extends Document {
	id: number;
	label: string;
	sigle: string;
	is_active: boolean;
	key_str: number;
	roomType: number;
}

export interface Disciplines extends Document {
	id: number;
	label: string;
	is_collective: boolean;
	is_active: boolean;
	is_outPlanning: boolean;
	discType: number;
	colors: {
		stroke: string;
		fill: string;
	};
}

export interface Products extends Document {
	id: number;
	key_disc: number;
	label: string;
	count_months: number;
	count_events: number;
	count_perWeek: number;
	is_active: boolean;
	duration: number;
}

export type DataContext = 'clients' | 'coaches' | 'events' | 'clients_events';

export interface Coaches extends Document {
	id: number;
	firstname: string;
	name: string;
	civility: number;
	state: number;
	sigle: string;
	colors: {
		stroke: string;
		fill: string;
	};
	phone_mobile: string;
	email: string;
	key_str: number;
}
//! cant reach it for now through the api
export interface ClientsProspects extends Document {
	provenance: number;
	Date: string;
	key_client: number;
	state: number;
	date_recall: string;
	Infos: string;
}

export interface LoginResponse {
	success: boolean;
	coach_id: number;
	client_id: number;
	token: string;
}

export interface Login extends Document {}

export interface ClientsPrestas extends Document {
	id: number;
	key_client: number;
	key_coach: number;
	key_room: number;
	key_product: number;
	key_str: number;
	events: number;
	date_start: string;
	date_end: string;
	duration: number;
	infos: string;
	pht: number;
	pttc: number;
	deposit: number;
	target: number;
	result: number;
	options: number;
	avis: number;
	pack: number;
}

export interface ClientsEvents extends Document {
	id: number;
	key_event: number;
	key_client: number;
	key_presta: number;
	attendance: number;
	count: number;
	events: number;
	key_room: number;
	key_coach: number;
	key_product: number;
	date: string;
	time: string;
	duration: number;
	type: number;
	specifics: number;
	infos: string;
	state: number;
}

export interface Rooms extends Document {
	id: number;
	label: string;
	sigle: string;
	is_active: boolean;
	key_str: number;
	roomType: number;
}

// export interface Events_day extends Document {}
