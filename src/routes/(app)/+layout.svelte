<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import RightSide from '$lib/components/RightSide.svelte';
</script>

<div class="flex border w-full max-w-6xl mx-auto">
	<Sidebar />
	<main class=" min-h-screen flex-1">
		<slot />
	</main>
	<RightSide />
</div>
