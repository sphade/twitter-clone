import { getPosts } from '$lib/services/queries';

export const load = ({ depends }) => {
	depends('posts');

	return {
		posts: getPosts()
	};
};
