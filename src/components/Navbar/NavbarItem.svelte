<script lang="ts">
	import { page } from '$app/stores';
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import clsx from 'clsx';
	import Typography from '../Global/Typography.svelte';
	import type Icon from '../Icons/Icon.svelte';

	type Constraint = SvelteComponent<ComponentProps<Icon>>;

	export let text: string;
	export let to: string;
	export let IconComponent: ComponentType<Constraint>;

	$: isCurrentPage = $page.url.pathname === to;
</script>

<li class="p-4">
	<a href={to} class="flex flex-col items-center gap-2">
		<svelte:component
			this={IconComponent}
			class="h-5 w-5 fill-white stroke-white"
		/>
		<div class={clsx('text-center', { 'font-bold': isCurrentPage })}>
			<Typography
				class="first-letter:uppercase"
				variant="xs"
				color="white"
				as="p"
			>
				{text}
			</Typography>
		</div>
	</a>
</li>
