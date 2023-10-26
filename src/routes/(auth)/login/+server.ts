import { adminAuth } from '$lib/server/firebaseAdmin.js';
import { error, json, redirect } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const idToken = await request.json();
	console.log(idToken);
	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	const decodedIdToken = await adminAuth.verifyIdToken(idToken);

	if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
		const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
		const options = { maxAge: expiresIn, httpOnly: true, secure: true };
		cookies.set('__session', sessionCookie, options);

		return json({ status: 'signedIn' });
	} else {
		throw error(401, 'Recent sign in required!');
	}
}
export const DELETE = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });

		return json({ status: 'signedOut' });
	
};
