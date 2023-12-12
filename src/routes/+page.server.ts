import { dev } from '$app/environment';
import { fail } from '@sveltejs/kit';

import { SpartaApi } from '~/lib/api-sdk';
import { COOKIE_NAMES, FORM_NAMES } from '~/lib/consts';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get(FORM_NAMES.login.username) as string;
		const password = formData.get(FORM_NAMES.login.password) as string;

		if (!username || !password)
			return fail(422, {
				error: "Le mot de passe ou nom d'utilisateur est incorrect"
			});

		try {
			const spartaApi = new SpartaApi();
			const response = await spartaApi.login.login(username, password);

			if (!response?.token) {
				throw new Error('Erreur serveur.');
			}

			spartaApi.authenticate(response.token);

			// Set the token in the cookies
			cookies.set(COOKIE_NAMES.token, `${response.token}`, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev,
				maxAge: 60 * 60 * 24 * 3 // 3 days
			});
			cookies.set(COOKIE_NAMES.coach_id, `${response.coach_id}`, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev,
				maxAge: 60 * 60 * 24 * 3 // 3 days
			});

			return { success: true };
		} catch (error) {
			return fail(500, {
				error: error
			});
		}
	}
};
