<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import clsx from 'clsx';
	

	import NavbarItem from './NavbarItem.svelte';

	export let items: ComponentProps<NavbarItem>[];
	export let className: string = '';
</script>

<nav class={clsx('bg-gray-900 py-4 px-8 w-full', className)}>
	<ul class="flex justify-between">
		{#each items as { text, to, IconComponent }}
			<NavbarItem {text} {to} {IconComponent} />
		{/each}
	</ul>

	
</nav>
