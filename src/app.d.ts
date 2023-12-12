// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from './lib/types';
import type { SpartaApi } from './lib/api-sdk';

declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			user: User | null;
			spartaApi: SpartaApi;
		}
	}
}

export {};
