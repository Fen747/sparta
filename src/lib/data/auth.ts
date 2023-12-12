import type { RequestEvent } from '@sveltejs/kit';

// TODO: to remove if not used later
export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;

	const userToken = cookies.get('token');

	if (userToken === 'userToken') {
		const user = {
			id: 1,
			email: 'user@example.com',
			role: 'Alexi'
		};
		return user;
	}

	if (userToken === 'adminToken') {
		const user = {
			id: 2,
			email: 'admin@example.com',
			role: 'BenJ'
		};
		return user;
	}

	return null;
};
