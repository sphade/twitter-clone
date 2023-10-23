// import { adminDB } from '$lib/server/firebaseAdmin.js';
// import type { IPost } from '$lib/types.js';
// // import { getPosts } from '$lib/services/queries';

// export const load = async ({ depends }) => {
// 	depends('posts');
// 	const getPosts = async () => {
// 		const res = [];
// 		const snapshot = await adminDB.collection('posts').get();
// 		snapshot.forEach((doc) => {
// 			const post = { id: doc.id, ...doc.data() } as IPost;
// 			post.timestamp = post?.timestamp?.toMillis() / 1000;
// 			res.push(post);
// 			console.log(res);
// 		});
// 		return res;
// 	};
// 	return {
// 		posts: getPosts()
// 	};
// };
import { getPosts } from '$lib/services/queries';
import { redirect } from '@sveltejs/kit';

export const load = ({ depends, locals }) => {
	depends('posts');
	if (!locals.userID) {
		throw redirect(303, '/login');
	}
	return {
		posts: getPosts()
	};
};
