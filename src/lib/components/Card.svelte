<script lang="ts">
	import Title from './CardTitle.svelte';
</script>

<div class="px-4 py-3 bg-gray-900 space-y-2 rounded-md">
	<slot {Title} />
	<slot name="content" />
	{#if $$slots.action}
		<slot name="action" />
	{/if}
</div>
