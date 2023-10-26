import { getUser } from '$lib/services/queries.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const userId = locals.userID;
	if (!userId) {
		throw redirect(303, '/login');
	}
	return {
		userId,
		user: getUser(userId)
	};
};
