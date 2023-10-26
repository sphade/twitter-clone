<script lang="ts">
	import TweetCard from '$lib/components/TweetCard.svelte';
	import { ArrowBottomLeft, ChatBubble, Heart, HeartFilled } from 'radix-icons-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import { addDoc, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
	import { db } from '$lib/firebase.js';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	let comment = '';
	const handleLikes = async () => {
		let newLikes;
		const postRef = doc(db, 'posts', $page.params.postId);
		if (data.post.likes.includes(data.userId)) {
			newLikes = data.post.likes.filter((id) => id !== data.userId);
		} else {
			newLikes = [...data.post.likes, data.userId];
		}
		data.post.likes = newLikes; // Optimistically update likes
		
		try {
			await updateDoc(postRef, {
				likes: newLikes
			});
		} catch (error) {
			console.error('Failed to update likes:', error);
			invalidate($page.params.postId);
		}
		// invalidate($page.params.postId);
	};
	$: comments = data.comments;

	onMount(() => {
		const q = query(collection(db, 'comments'), where('postId', '==', $page.params.postId));
		const unsubscribe = onSnapshot(q, (querySnapshot: any[]) => {
			let newComments = [];
			querySnapshot.forEach((doc) => {
				newComments.push(doc.data());
			});
			comments = newComments;
		});
		return () => {
			unsubscribe();
		};
	});

	// const notOp = async () => {
	// 	const postRef = doc(db, 'posts', $page.params.postId);
	// 	if (data.post.likes.includes(data.userId)) {
	// 		await updateDoc(postRef, {
	// 			likes: arrayRemove(data.userId)
	// 		});
	// 	} else {
	// 		await updateDoc(postRef, {
	// 			likes: arrayUnion(data.userId)
	// 		});
	// 	}
	// 	invalidate($page.params.postId);
	// };
</script>

<header class="p-4 flex items-center gap-3">
	<ArrowBottomLeft />

	<h1 class="capitalize font-semibold text-lg">post</h1>
</header>

<div>
	<div class="px-4">
		<div class="flex justify-between">
			<div class="flex gap-2">
				<Avatar.Root>
					<Avatar.Image src={data.post.profilePic} alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="capitalize font-semibold">{data.post.name}</p>
					<p class="text-sm text-gray-800">@{data.post.email}</p>
				</div>
			</div>
			<Button variant="secondary">follow</Button>
		</div>
		<p>
			{data.post.tweet}
		</p>
		{#if data.post.img}
			<img src={data.post.img} alt="" />
		{/if}
		<div class="flex justify-between text-sm mt-2">
			<button
				on:click={handleLikes}
				class="flex transition-all group items-center gap-2 text-gray-600"
			>
				<div class="p-1 rounded-full group-hover:bg-blue-500/20">
					{#if data.post.likes.includes(data.userId)}
						<HeartFilled class=" text-blue-500 " />
					{:else}
						<Heart class=" group-hover:text-blue-500 " />
					{/if}
				</div>
				<span class="group-hover:text-blue-500"> {data.post.likes.length} </span>
			</button>
			<button class="flex transition-all group items-center gap-2 text-gray-600">
				<div class="p-1 rounded-full group-hover:bg-green-500/20">
					<ChatBubble class=" group-hover:text-green-500 " />
				</div>
				<span class="group-hover:text-green-500"> 5 </span>
			</button>
			<button class="flex transition-all group items-center gap-2 text-gray-600">
				<div class="p-1 rounded-full group-hover:bg-pink-500/20">
					<ChatBubble class=" group-hover:text-pink-500 " />
				</div>
				<span class="group-hover:text-pink-500"> 5 </span>
			</button>
			<button class="flex transition-all group items-center gap-2 text-gray-600">
				<div class="p-1 rounded-full group-hover:bg-blue-500/20">
					<ChatBubble class=" group-hover:text-blue-500 " />
				</div>
				<span class="group-hover:text-blue-500"> 5 </span>
			</button>
		</div>
	</div>
	<div class="flex gap-2 px-4 py-3">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<input
			type="text"
			bind:value={comment}
			class="bg-transparent flex-1"
			placeholder="Post your replay"
		/>
		<Button
			on:click={async () => {
				const newComment = comment;
				comment = '';
				const c = await addDoc(collection(db, 'comments'), {
					content: newComment,
					name: data.user.name,
					profilePic: data.user.profilePic,
					postId: $page.params.postId
				});
				comment = '';
				console.log(c);
			}}
			disabled={comment.length < 1}>comment</Button
		>
	</div>
	<div class="w-full">
		{#each comments as comment}
			<TweetCard
				likes={[]}
				avatar={comment.profilePic}
				name={comment.name}
				tweet={comment.content}
			/>
		{/each}

		<!-- <TweetCard />
		<TweetCard />
		<TweetCard />
		<TweetCard />
		<TweetCard />
		<TweetCard /> -->
	</div>
</div>
