import { db } from '$lib/firebase';
import { getPost } from '$lib/services/queries';
import { query, collection, where, onSnapshot, getDocs } from 'firebase/firestore';

export const load = async ({ params, depends }) => {
	const { postId } = params;
	depends(postId);
	const getComments = async () => {
		let comments = [];

		const q = query(collection(db, 'comments'), where('postId', '==', postId));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			comments.push({ id: doc.id, ...doc.data() });
		});
		console.log('🚀 ~ file: +page.server.ts:16 ~ querySnapshot.forEach ~ comments:', comments);
		return comments;
	};

	return {
		post: getPost(postId),
		comments: getComments()
	};
};
