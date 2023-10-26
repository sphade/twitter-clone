<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';

	import { ChatBubble, Heart, HeartFilled } from 'radix-icons-svelte';
	export let avatar: string;
	export let tweet: string;
	export let email: string;
	export let name: string;

	export let id: string;
	export let img: string | undefined;
	export let likes: string[];
</script>

<a href="/post/{id}" class="flex gap-2 border-t p-3">
	<Avatar.Root>
		<Avatar.Image src={avatar} alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<div class="w-full">
		<div class="flex items-center text-xs text-gray-500 gap-1">
			<h3 class="capitalize text-sm font-semibold text-white">{name}</h3>
			<p>@{email}</p>
			.
			<p>22h</p>
		</div>

		<p class="text-sm flex flex-wrap break-words mb-2">
			{tweet}
		</p>

		{#if img}
			<img src={img} class="rounded-sm mt-2 object-contain w-full" alt="" />
		{/if}
		<div class="flex justify-between text-sm mt-2">
			<button class="flex transition-all group items-center gap-2 text-gray-600">
				<div class="p-1 rounded-full group-hover:bg-blue-500/20">
					{#if likes?.includes($page.data.userId)}
						<HeartFilled class=" text-blue-500 " />
					{:else}
						<Heart class=" group-hover:text-blue-500 " />
					{/if}
				</div>
				<span class="group-hover:text-blue-500"> {likes.length}</span>
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
</a>
