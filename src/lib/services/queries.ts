import { db } from '$lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { error } from '@sveltejs/kit';
import type { IPost, IUser } from '$lib/types';
export const getUser = async (uid: string) => {
	try {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);
		return docSnap.data() as IUser;
	} catch (e) {
		throw error(400, 'an error occurred, try again later ');
	}
};
export const getPosts = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'posts'));
		const res: IPost[] = [];
		querySnapshot.forEach((doc) => {
			const post = { id: doc.id, ...doc.data() } as IPost;
			res.push(post);
		});
		return res;
	} catch (e) {
		throw error(400, 'an error occurred, try again later ');
	}
};
export const getPost = async (id: string) => {
	try {
		const postSnap = await getDoc(doc(db, 'posts', id));
		return postSnap.data() as IPost;
	} catch (e) {
		throw error(400, 'an error occurred, try again later ');
	}
};
export 	const getComments = async (postId:string) => {
	const comments = [];

	const q = query(collection(db, 'comments'), where('postId', '==', postId));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		comments.push({ id: doc.id, ...doc.data() });
	});
	return comments;
};
