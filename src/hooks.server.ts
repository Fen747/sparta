import { redirect, type Handle } from '@sveltejs/kit';
import { COOKIE_NAMES, ROUTES } from '$lib/consts';
import { SpartaApi, getSpartaApi } from '$lib/api-sdk';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(COOKIE_NAMES.token);

	// si token invalide qlors redirect login
	if (
		event.request.method === 'GET' &&
		!token &&
		!event.request.url.endsWith('/')
	) {
		throw redirect(303, `${ROUTES.login}`);
	}

	const coachIdString = event.cookies.get(COOKIE_NAMES.coach_id);

	if (token && coachIdString) {
		const coachId = parseInt(coachIdString);
		const spartaApi = getSpartaApi(token);

		try {
			const coachInfo = await spartaApi.coaches.get(coachId);
			event.locals = {
				...event.locals,
				spartaApi,
				user: {
					token,
					data: {
						coach_id: coachId,
						coach_name: coachInfo[0].name + ' ' + coachInfo[0].firstname
					}
				}
			};
		} catch (error) {
			console.error('Error fetching coach info:', error);
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	if (event.route.id) {
		// If not 404 route, ie the id is null if a 404 is thrown.

		if (event.route.id.startsWith('/(private)')) {
			if (!event.locals.user) {
				// If the user is authenticated and on a private page, we redirect it to the login page.
				throw redirect(303, `${ROUTES.login}`);
			}
		}

		if (event.route.id === `${ROUTES.login}`) {
			if (event.locals.user) {
				// If the user is authenticated and on the login page, we redirect it to dashboard.
				throw redirect(303, `${ROUTES.private.dashboard}`);
			}
		}
	}

	const response = await resolve(event);

	return response;
};
