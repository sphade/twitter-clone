// See https://kit.svelte.dev/docs/types#app

import type { IUser } from '$lib/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userID: string | null;
		}
		interface PageData {
			user: IUser;
			userId: string;
		}
		// interface Platform {}
	}
}

export {};
