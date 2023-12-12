<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import type Icon from '../Icons/Icon.svelte';

	type Constraint = SvelteComponent<ComponentProps<Icon>>;

	interface $$Props extends HTMLTextareaAttributes {
		label?: string;
	}
	export let label: $$Props['label'] = '';
	export let placeholder: $$Props['placeholder'] = '';
	export let name: $$Props['name'] = '';
	export let disabled: $$Props['disabled'] = false;
	export let IconComponent: ComponentType<Constraint>;

	const styles = clsx(
		'w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm font-medium text-gray-700 disabled:bg-gray-200 disabled:text-gray-400',
		{
			'hover:bg-gray-100 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50':
				!disabled
		}
	);
</script>

<div class={clsx('flex flex-col gap-1.5 relative items-left')}>
	{#if label}
		<label for={name} class="text-sm font-medium text-gray-700">{label}</label>
	{/if}
	<div class="w-full">
		<textarea {...$$restProps} {name} class={styles} {placeholder} />
	</div>
	<div class="fixed right-5 mt-2">
		<svelte:component
			this={IconComponent}
			class="h-5 w-5 fill-black stroke-black"
		/>
	</div>
</div>
