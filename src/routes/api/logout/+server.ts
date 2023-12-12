import { redirect, type RequestHandler } from '@sveltejs/kit';
import { COOKIE_NAMES, ROUTES } from '~/lib/consts';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.set(COOKIE_NAMES.token, '', {
		path: '/',
		expires: new Date(0)
	});

	throw redirect(302, `${ROUTES.login}`);
};
