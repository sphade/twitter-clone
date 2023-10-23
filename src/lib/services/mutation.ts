import { db } from '$lib/firebase';
import type { IPost } from '$lib/types';
import { addDoc, collection } from 'firebase/firestore';

export const createPost = async ({ tweet, userID, img, likes, ...rest }: IPost) => {
	await addDoc(collection(db, 'posts'), {
		tweet,
		userID,

		img,
		likes,
		...rest
	});
};
