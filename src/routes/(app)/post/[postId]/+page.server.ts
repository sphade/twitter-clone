import { getComments, getPost } from '$lib/services/queries';

export const load = async ({ params, depends }) => {
	const { postId } = params;
	depends(postId);

	return {
		post: getPost(postId),
		comments: getComments(postId)
	};
};
