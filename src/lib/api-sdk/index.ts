import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type {
	Document,
	Events,
	Clients,
	Qualifiers,
	Structures,
	Rooms,
	Disciplines,
	Products,
	Coaches,
	ClientsEvents,
	ClientsPrestas,
	ClientsProspects,
	Login,
	LoginResponse,
	DataContext,
	ApiResponse
} from './types';

interface AxiosInstanceAndSpartaApi {
	axiosInstance: AxiosInstance;
	spartaApiInstance: SpartaApi;
}

class EntityApi<T extends Document> {
	protected entityName: string;
	protected axios: AxiosInstance;
	protected transformFunction: (
		data: T | T[]
	) => Pick<T, keyof T> | Pick<T, keyof T>[];
	protected qualifiers: any;
	protected spartaApiInstance: SpartaApi;

	constructor(
		entityName: string,
		{ axiosInstance, spartaApiInstance }: AxiosInstanceAndSpartaApi,
		keysToKeep?: (keyof T)[],
		context?: DataContextAxiosInstance
	) {
		this.spartaApiInstance = spartaApiInstance;
		this.entityName = entityName;
		this.axios = axiosInstance;
		//this.keyMapping = this.keyMapping
		if (keysToKeep && context) {
			this.transformFunction = this.createTransformFunction(
				keysToKeep,
				context
			);
		} else {
			this.transformFunction = (data: T | T[]) => data;
		}
	}

	protected keyMapping: {
		[context in DataContext]?: { [key: string]: string };
	} = {
		coaches: { state: 'coachState' },
		clients: {
			state: 'clientState'
		},
		events: {
			state: 'eventState',
			type: 'eventType',
			specifics: 'eventSpecifics'
		},
		clients_events: {
			attendance: 'clientAttendance'
		},
		clients_prospects: {
			state: 'prospectState',
			provenance: 'clientSource'
		}
	};

	protected getTextLabel(index: number, qualifierKey: string): string {
		const qualifier = this.spartaApiInstance.qualifiers[qualifierKey];
		if (qualifier && qualifier.at_lbl && qualifier.at_lbl[index]) {
			return qualifier.at_lbl[index];
		} else {
			return 'Unkmown index: ${index';
		}
	}

	private createTransformFunction(
		keysToKeep: (keyof T)[],
		context: DataContext
	): (data: T | T[]) => Promise<Pick<T, keyof T> | Pick<T, keyof T>[]> {
		return async (
			data: T | T[]
		): Promise<Pick<T, keyof T> | Pick<T, keyof T>[]> => {
			// await this.initQualifiers();
			const transformItem = (item: T): Pick<T, keyof T> => {
				const filteredItem = this.filterObjectProperties(item, keysToKeep);
				const currentKeyMapping = this.keyMapping[context] || {};

				Object.keys(filteredItem).forEach((key) => {
					const mappedKey = currentKeyMapping[key] || key;
					if (
						this.spartaApiInstance.qualifiers[mappedKey] &&
						typeof filteredItem[key] === 'number'
					) {
						filteredItem[key] = this.getTextLabel(filteredItem[key], mappedKey);
					}
				});
				return filteredItem;
			};

			if (Array.isArray(data)) {
				return Promise.all(data.map(transformItem));
			} else {
				return transformItem(data);
			}
		};
	}

	private filterObjectProperties<T extends object, K extends keyof T>(
		obj: T,
		keysToKeep: K[]
	): Pick<T, K> {
		return Object.keys(obj).reduce((filteredObj, key) => {
			if (keysToKeep.includes(key as K)) {
				(filteredObj as T)[key as K] = obj[key as K];
			}
			return filteredObj;
		}, {} as Pick<T, K>);
	}

	async get(id: number): Promise<T> {
		const response = await this.axios.get<T>(`${this.entityName}/?id=${id}`);
		return response.data;
	}

	async list(): Promise<T[]> {
		const response = await this.axios.get<T[]>(`${this.entityName}`);
		return response.data;
	}
	async listWithFilter(): Promise<Pick<T, keyof T>[]> {
		const response = await this.axios.get<T[]>(`${this.entityName}`);
		const transformedData = this.transformFunction(response.data);
		return Array.isArray(transformedData) ? transformedData : [transformedData];
	}

	async createOne(data: T): Promise<T> {
		const response = await this.axios.post<T>(
			`${this.entityName}/?is_clients=true`,
			data
		);

		return response.data;
	}

	async updateOne(id: number, data: T): Promise<T> {
		const response = await this.axios.put<T>(
			`${this.entityName}/?id=${id}`,
			data
		);
		return response.data;
	}

	async deleteOne(id: number): Promise<T> {
		const response = await this.axios.delete<T>(`${this.entityName}/?id=${id}`);
		return response.data;
	}

	async getFiltered(id: number): Promise<Pick<T, keyof T>[]> {
		const response = await this.axios.get<T>(`${this.entityName}/?id=${id}`);
		// Apply the transform function to filter the properties
		return this.transformFunction(response.data) as Pick<T, keyof T>[];
	}

	async listFiltered(): Promise<Pick<T, keyof T>[]> {
		const response = await this.axios.get<T[]>(`${this.entityName}`);
		// Apply the transform function to each item in the array to filter the properties
		return this.transformFunction(response.data) as Pick<T, keyof T>[];
	}
}

class ClientsApi extends EntityApi<Clients> {
	constructor(
		{ axiosInstance, spartaApiInstance }: AxiosInstanceAndSpartaApi,
		keysToKeep: (keyof Clients)[],
		context?: DataContext
	) {
		super('clients', { axiosInstance, spartaApiInstance }, keysToKeep, context);
	}

	async getByKey_prospect(key_prospect: number): Promise<Clients[]> {
		const response = await this.axios.get<Clients[]>(
			`${this.entityName}/?key_prospect=${key_prospect}`
		);
		return response.data;
	}

	async getByKey_referent(
		key_referent: number
	): Promise<Pick<Clients, keyof Clients>[]> {
		const response = await this.axios.get<Clients[]>(
			`${this.entityName}/?key_referent=${key_referent}`
		);
		return this.transformFunction(response.data) as Pick<
			Clients,
			keyof Clients
		>[];
	}
	async getByKey_referent_and_state(
		key_referent: number,
		state: number
	): Promise<Pick<Clients, keyof Clients>[]> {
		const response = await this.axios.get<Clients[]>(
			`${this.entityName}/?key_referent=${key_referent}&state=${state}`
		);
		return this.transformFunction(response.data) as Pick<
			Clients,
			keyof Clients
		>[];
	}

	async getByKey_structure(
		key_structure: number
	): Promise<Pick<Clients, keyof Clients>[]> {
		const response = await this.axios.get<Clients[]>(
			`${this.entityName}/?key_str=${key_structure}`
		);
		return this.transformFunction(response.data) as Pick<
			Clients,
			keyof Clients
		>[];
	}

	async getState(state: string): Promise<Pick<Clients, keyof Clients>[]> {
		const response = await this.axios.get<Clients[]>(
			`${this.entityName}/?state=${state}`
		);
		return this.transformFunction(response.data) as Pick<
			Clients,
			keyof Clients
		>[];
	}

	async getName(name: string): Promise<Pick<Clients, keyof Clients>[]> {
		const response = await this.axios.get<Clients>(
			`${this.entityName}/?name=${name}`
		);
		return this.transformFunction(response.data) as Pick<
			Clients,
			keyof Clients
		>[];
	}

	async getFilteredClients(): Promise<Pick<Clients, keyof Clients>[]> {
		const response = await this.axios.get<Clients[]>(`${this.entityName}`);
		return this.transformFunction(response.data) as Pick<
			Clients,
			keyof Clients
		>[];
	}

	async getFilteredByKey_prospect(
		key_prospect: number
	): Promise<Pick<Clients, keyof Clients>[]> {
		const response = await this.axios.get<Clients[]>(
			`${this.entityName}/?key_prospect=${key_prospect}`
		);
		return this.transformFunction(response.data) as Pick<
			Clients,
			keyof Clients
		>[];
	}

	async createAClient(data: Clients): Promise<ApiResponse> {
		const response = await this.axios.post<Clients>(`${this.entityName}`, data);
		return response.data;
	}
}

class ClientsProspectsApi extends EntityApi<ClientsProspects> {
	async getByKey_coach(key_coach: number): Promise<ClientsProspects[]> {
		const response = await this.axios.get<ClientsProspects[]>(
			`${this.entityName}/?key_coach=${key_coach}`
		);
		return response.data;
	}
	async getKey_client(key_client: number): Promise<ClientsProspects[]> {
		const response = await this.axios.get<ClientsProspects[]>(
			`${this.entityName}/?key_client=${key_client}`
		);
		return response.data;
	}

	async createInitialProspectEvent(
		data: ClientsProspects
	): Promise<ApiResponse> {
		const response = await this.axios.post<ApiResponse>(
			`${this.entityName}`,
			data
		);
		return response.data;
	}

	async getFilteredByKey_client(
		key_client: number
	): Promise<Pick<ClientsProspects, keyof ClientsProspects>[]> {
		const response = await this.axios.get<ClientsProspects[]>(
			`${this.entityName}/?key_client=${key_client}`
		);
		return this.transformFunction(response.data) as Pick<
			ClientsProspects,
			keyof ClientsProspects
		>[];
	}
}

class ClientsPrestasApi extends EntityApi<ClientsPrestas> {
	async getKey_client_prestas(key_client: number): Promise<ClientsPrestas[]> {
		const response = await this.axios.get<ClientsPrestas[]>(
			`${this.entityName}/?key_client=${key_client}`
		);
		return response.data;
	}

	async getFilteredByKey_client_prestas(
		key_client: number
	): Promise<Pick<ClientsPrestas, keyof ClientsPrestas>[]> {
		const response = await this.axios.get<ClientsPrestas[]>(
			`${this.entityName}/?key_client=${key_client}`
		);
		// Apply the transform function to each item in the array to filter the properties
		return response.data.map((item) => this.transformFunction(item)) as Pick<
			ClientsPrestas,
			keyof ClientsPrestas
		>[];
	}
}

class LoginApi extends EntityApi<Login> {
	public updateAxiosInstance(token: string): void {
		this.axios.defaults.headers.common['token'] = token;
	}

	async login(username: string, password: string): Promise<LoginResponse> {
		const credentials = btoa(`${username}:${password}`);
		const config = {
			headers: {
				Authorization: `Basic ${credentials}`,
				'Content-Type': 'application/json'
			}
		};

		try {
			const response = await axios.get<LoginResponse>(
				`https://dev-horizon-parapente.fr/api/login`,
				config
			);

			if (response.data.token) {
				this.updateAxiosInstance(response.data.token);
				return response.data;
			} else {
				throw new Error('No token received');
			}
		} catch (error) {
			console.error('Login failed');
			throw error;
		}
	}
}

class EventsApi extends EntityApi<Events> {
	async getKey_room(key_room: number): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_room=${key_room}`
		);
		return response.data;
	}

	async getKey_coach(key_coach: number): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_coach=${key_coach}`
		);
		return response.data;
	}

	async getKey_discipline(key_discipline: number): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_disc=${key_discipline}`
		);
		return response.data;
	}
	async getDate(date: string): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?date=${date}`
		);
		return response.data;
	}

	async getCount(count: number): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?count=${count}`
		);
		return response.data;
	}

	async getStateEvent(state: number): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?state=${state}`
		);
		return response.data;
	}

	async getIs_clients(is_clients: boolean): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?is_clients=${is_clients}`
		);
		return response.data;
	}

	async getFilteredByKey_room(
		key_room: number
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_room=${key_room}`
		);
		return response.data.map((event) => this.transformFunction(event)) as Pick<
			Events,
			keyof Events
		>[];
	}
	// //Choper Event lié au coach
	// 	async getEventsForCoach(coach_id: number): Promise<Pick<Events, keyof Events>[]> {
	// 		const response = await this.axios.get<Events[]>(`${this.entityName}/?key_coach=${coach_id}`);

	// 		return this.transformFunction(response.data) as Pick<Events, keyof Events>[];
	// 	}
	async getFilteredByKey_coach(
		key_coach: number
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_coach=${key_coach}`
		);
		return this.transformFunction(response.data) as Pick<
			Events,
			keyof Events
		>[];
	}

	//Test car le endpoint ne filtre pas par id_coach
	async getFilteredByKey_coach_strict(
		key_coach: number
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_coach=${key_coach}`
		);
		const filteredEvents = response.data.filter(
			(e) => e.key_coach === key_coach
		);

		return this.transformFunction(filteredEvents) as Pick<
			Events,
			keyof Events
		>[];
	}
	async getFilteredByKey_discipline(
		key_discipline: number
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_disc=${key_discipline}`
		);
		return response.data.map((event) => this.transformFunction(event)) as Pick<
			Events,
			keyof Events
		>[];
	}

	async getFilteredByDate(date: string): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?date=${date}`
		);
		return response.data.map((event) => this.transformFunction(event)) as Pick<
			Events,
			keyof Events
		>[];
	}
	async getFilteredByDateAndCoach(
		date: string,
		coach_id: number
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?date=${date}&key_coach=${coach_id}`
		);
		return this.transformFunction(response.data) as Pick<
			Events,
			keyof Events
		>[];
	}

	async getFilteredByCount(
		count: number
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?count=${count}`
		);

		return response.data.map((event) => this.transformFunction(event)) as Pick<
			Events,
			keyof Events
		>[];
	}

	async getFilteredByStateEvent(
		state: number
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?state=${state}`
		);
		return response.data.map((event) => this.transformFunction(event)) as Pick<
			Events,
			keyof Events
		>[];
	}
	async getEventsByClientId(key_client: number): Promise<Events[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?key_client=${key_client}`
		);
		return response.data;
	}
	async getFilteredByIs_clients(
		is_clients: boolean
	): Promise<Pick<Events, keyof Events>[]> {
		const response = await this.axios.get<Events[]>(
			`${this.entityName}/?is_clients=${is_clients}`
		);
		return response.data.map((event) => this.transformFunction(event)) as Pick<
			Events,
			keyof Events
		>[];
	}
}

//Test Florent pour add des getbykey

class RoomsApi extends EntityApi<Rooms> {
	async getFilteredByKey_room(
		key_room: number
	): Promise<Pick<Rooms, keyof Rooms>[]> {
		const response = await this.axios.get<Rooms[]>(
			`${this.entityName}/?key_room=${key_room}`
		);
		return this.transformFunction(response.data) as Pick<Rooms, keyof Rooms>[];
	}
}

class ClientsEventsApi extends EntityApi<ClientsEvents> {
	async getKey_event(key_event: number): Promise<ClientsEvents> {
		const response = await this.axios.get<ClientsEvents>(
			`${this.entityName}/?key_event=${key_event}`
		);
		return response.data;
	}

	async getKey_client_event(key_client: number): Promise<ClientsEvents> {
		const response = await this.axios.get<ClientsEvents>(
			`${this.entityName}/?key_client=${key_client}`
		);
		return response.data;
	}

	async getFilteredByKey_event(
		key_event: number
	): Promise<Pick<ClientsEvents, keyof ClientsEvents>[]> {
		const response = await this.axios.get<ClientsEvents[]>(
			`${this.entityName}/?key_event=${key_event}`
		);
		return this.transformFunction(response.data) as Pick<
			ClientsEvents,
			keyof ClientsEvents
		>[];
	}

	async getFilteredByKey_client_event(
		key_client: number
	): Promise<Pick<ClientsEvents, keyof ClientsEvents>[]> {
		const response = await this.axios.get<ClientsEvents[]>(
			`${this.entityName}/?key_client=${key_client}`
		);
		return this.transformFunction(response.data) as Pick<
			ClientsEvents,
			keyof ClientsEvents
		>[];
	}
}

export class SpartaApi {
	public axiosInstance!: AxiosInstance;
	public qualifiers!: Qualifiers;
	public qualifiersApi!: EntityApi<Qualifiers>;
	public structures!: EntityApi<Structures>;
	public rooms!: EntityApi<Rooms>;
	public disciplines!: EntityApi<Disciplines>;
	public products!: EntityApi<Products>;
	public coaches!: EntityApi<Coaches>;
	public clients!: ClientsApi;
	public clients_prospects!: ClientsProspectsApi;
	public clients_prestas!: ClientsPrestasApi;
	public events!: EventsApi;
	public clients_events!: ClientsEventsApi;
	public login!: LoginApi;

	constructor(token?: string) {
		const axiosInstance: AxiosInstance = axios.create({
			baseURL: 'https://dev-horizon-parapente.fr/api/',
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: false
		});
		if (token) {
			this.authenticate(token);
		}
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const spartaApiInstance = this;

		this.login = new LoginApi('login', {
			axiosInstance,
			spartaApiInstance
		});

		this.axiosInstance = axiosInstance;
	}

	authenticate(token: string): void {
		const axiosInstance = this.axiosInstance;
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const spartaApiInstance = this;

		this.initQualifiers()
			.then(() => {
				console.log('Qualifiers initialized successfully');
			})
			.catch((error) => {
				console.error('Failed to initialize qualifiers', error);
			});

		instances[token] = spartaApiInstance;
		this.qualifiersApi = new EntityApi<Qualifiers>('qualifiers', {
			axiosInstance,
			spartaApiInstance
		});
		this.structures = new EntityApi<Structures>('structures', {
			axiosInstance,
			spartaApiInstance
		});
		this.rooms = new EntityApi<Rooms>('rooms', {
			axiosInstance,
			spartaApiInstance
		});
		this.disciplines = new EntityApi<Disciplines>(
			'disciplines',
			{ axiosInstance, spartaApiInstance },
			['id']
		);
		this.products = new EntityApi<Products>('products', {
			axiosInstance,
			spartaApiInstance
		});
		this.coaches = new EntityApi<Coaches>(
			'coaches',
			{ axiosInstance, spartaApiInstance },
			['state', 'name', 'civility', 'firstname', 'colors', 'key_str', 'id'],
			'coaches'
		);
		this.clients = new ClientsApi(
			{ axiosInstance, spartaApiInstance },
			[
				'id',
				'name',
				'firstname',
				'state',
				'key_str',
				'email',
				'phone_mobile',
				'prospect_source',
				'key_referent',
				'infos'
			],
			'clients'
		);
		this.clients_prospects = new ClientsProspectsApi(
			'clients_prospects',
			{ axiosInstance, spartaApiInstance },
			['id', 'state', 'provenance', 'Infos', 'date_recall', 'Date']
		);
		this.clients_prestas = new ClientsPrestasApi('clients_prestas', {
			axiosInstance,
			spartaApiInstance
		});
		this.events = new EventsApi(
			'events',
			{ axiosInstance, spartaApiInstance },
			[
				'state',
				'id',
				'key_disc',
				'key_room',
				'key_coach',
				'key_product',
				'date',
				'time',
				'duration',
				'type',
				'specifics',
				'infos'
			],
			'events'
		);
		this.clients_events = new ClientsEventsApi(
			'clients_events',
			{ axiosInstance, spartaApiInstance },
			[
				'key_event',
				'key_presta',
				'attendance',
				'count',
				'key_client',
				'events'
			],
			'clients_events'
		);
	}

	private async initQualifiers(): Promise<void> {
		try {
			const response = await this.axiosInstance.get<Qualifiers>('qualifiers');
			this.qualifiers = response.data;
		} catch (error) {
			console.error('Failed to fetch qualifiers', error);
			throw error;
		}
	}
}

const instances: Record<string, SpartaApi> = {};

export const getSpartaApi = (token: string): SpartaApi => {
	if (!instances[token]) {
		instances[token] = new SpartaApi(token);
	}

	return instances[token];
};
