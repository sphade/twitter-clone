<script lang="ts">
	import {
		BarChart,
		Bell,
		EnvelopeClosed,
		Home,
		Image,
		MagnifyingGlass,
		Pencil1,
		Reader
	} from 'radix-icons-svelte';
	import Button from './ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Dialog from '$lib/components/ui/dialog';
	import { page } from '$app/stores';
	let openModal = false;
	const sidebarOptions = [
		{
			icons: Home,
			title: 'home',
			href: '/'
		},
		{
			icons: MagnifyingGlass,
			title: 'explorer',
			href: '/protected'
		},
		{
			icons: Bell,
			title: 'notification',
			href: '/'
		},
		{
			icons: EnvelopeClosed,
			title: 'messages',
			href: '/'
		},
		{
			icons: Reader,
			title: 'lists',
			href: '/'
		},
		{
			icons: Home,
			title: 'communities',
			href: '/'
		},
		{
			icons: Home,
			title: 'premium',
			href: '/'
		},
		{
			icons: Home,
			title: 'login',
			href: '/login'
		}
	];
</script>

<div
	class="px-3 md:flex-[0.2] md:px-2 border flex justify-between flex-col h-screen sticky z-10 top-0 left-0"
>
	<div class="mt-10">
		{#each sidebarOptions as { href, icons, title }}
			<a {href} class="flex gap-[22px] hover:bg-white/10 p-3 w-fit rounded-full">
				<svelte:component this={icons} class="w-7 h-7" />
				<p class=" text-lg capitalize hidden md:inline-block pr-5">{title}</p>
			</a>
		{/each}
	</div>
	<Button size="icon" on:click={() => (openModal = true)} class="md:py-6  md:w-full">
		<Pencil1 class="md:mr-2  h-4 w-4" />
		<span class="hidden md:inline"> Post </span>
	</Button>

	<div class="flex gap-2 items-center justify-center">
		<Avatar.Root>
			<Avatar.Image src={$page.data.user?.profilePic} alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="hidden md:inline-block">
			<p class="font-medium capitalize">{$page.data.user?.name}</p>
			<p class="text-gray-800">{$page.data.user?.email}</p>
		</div>
	</div>
</div>
<Dialog.Root
	open={openModal}
	onOpenChange={(o) => {
		openModal = !openModal;
	}}
>
	<Dialog.Content class="max-h-[500px]  overflow-auto ">
		<div class="flex gap-2">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex-1">
				<textarea
					class="bg-transparent w-full outline-none text-xl"
					placeholder="what is happening"
				/>

				<img src="/post1.png" class="border border-red-500" alt="" />
			</div>
		</div>
		<div class="py-3 border-t flex items-start justify-between">
			<Image class="text-primary" />
			<Button>Post</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
