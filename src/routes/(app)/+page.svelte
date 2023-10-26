<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import TweetCard from '$lib/components/TweetCard.svelte';
	import { Image } from 'radix-icons-svelte';
	import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
	import { invalidate } from '$app/navigation';
	import { db, storage } from '$lib/firebase.js';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	let loading = false;
	let tweet = '';
	let imgFile;
	export let data;
</script>

<Header />

<div class="px-4 py-2 flex gap-2">
	<Avatar.Root>
		<Avatar.Image src={data.user?.profilePic} alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<div class="w-full border">
		<input
			type="text"
			class="bg-transparent text-lg w-full px-2 outline-none h-10"
			placeholder="what is happening?!"
			bind:value={tweet}
		/>

		<div class="flex border-t py-3 justify-between items-center">
			<div class="flex gap-2 items-center">
				<input
					type="file"
					on:change={(e) => {
						imgFile = e?.target?.files[0];
					}}
					hidden
					id="img"
					accept="image/png, image/jpeg, image/gif, image/webp"
				/>
				<label for="img">
					<Image class="text-primary cursor-pointer " />
				</label>
				<Image class="text-primary" />
				<Image class="text-primary" />
				<Image class="text-primary" />
			</div>
			<Button
				on:click={async () => {
					loading = true;
					let url = '';
					if (imgFile) {
						const storageRef = ref(storage, `posts/${data.userId}/${imgFile.name}`);
						const result = await uploadBytes(storageRef, imgFile);
						url = await getDownloadURL(result.ref);
					}

					await addDoc(collection(db, 'posts'), {
						tweet,
						userID: data.userId,
						img: url,
						...data.user,
						likes: []
					});
					loading = false;
					tweet = '';
					invalidate('posts');
				}}
				disabled={tweet?.length < 5 || loading}
			>
				{#if loading}
					loading...
				{:else}
					Post
				{/if}
			</Button>
		</div>
	</div>
</div>
<div>
	{#if data.posts.length > 0}
		{#each data.posts as post}
			<TweetCard
				avatar={post.profilePic}
				email={post.email}
				img={post.img}
				name={post.name}
				tweet={post.tweet}
				id={post.id}
				likes={post.likes}
			/>
		{/each}
	{:else}
		no data
	{/if}
</div>
