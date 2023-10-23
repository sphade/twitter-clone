import { adminAuth } from '$lib/server/firebaseAdmin';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('__session');

	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);

		event.locals.userID = decodedClaims.uid;
	} catch (e) {
		event.locals.userID = null;

		return resolve(event);
	}

	// return resolve(event);
	const response = await resolve(event);

	return response;
}) satisfies Handle;
