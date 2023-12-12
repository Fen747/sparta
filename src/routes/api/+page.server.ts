import { redirect } from '@sveltejs/kit';
import { ROUTES } from '~/lib/consts';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	throw redirect(303, `${ROUTES.login}`);
};
