<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import type Icon from '../Icons/Icon.svelte';

	type Constraint = SvelteComponent<ComponentProps<Icon>>;

	interface $$Props extends HTMLInputAttributes {
		label?: string;
		left?: boolean;
		value?: string;
		IconComponent?: ComponentType<Constraint>;
	}
	export let left: $$Props['left'] = false;
	export let label: $$Props['label'] = '';
	export let placeholder: $$Props['placeholder'] = '';
	export let name: $$Props['name'] = '';
	export let type: $$Props['type'] = 'text';
	export let disabled: $$Props['disabled'] = false;
	export let IconComponent: ComponentType<Constraint> | null = null;
	export let value: $$Props['value'] = '';

	const handleInput = (event: Event) => {
		value = (event.target as HTMLInputElement).value;
	};

	const styles = clsx(
		'w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm font-medium text-gray-700 disabled:bg-gray-200 disabled:text-gray-400',
		{
			'hover:bg-gray-100 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50':
				!disabled
		}
	);
</script>

<div
	class={clsx(
		'flex flex-col gap-1.5 relative',
		left ? 'items-left' : 'items-center'
	)}
>
	{#if label}
		<label for={name} class="text-sm font-medium text-gray-700">{label}</label>
	{/if}
	<div class="w-full">
		<input
			{...$$restProps}
			{name}
			{type}
			class={styles}
			{placeholder}
			{value}
			{disabled}
			on:change={handleInput}
		/>
	</div>
	<div class="absolute right-5 mt-2">
		<svelte:component
			this={IconComponent}
			class="h-5 w-5 fill-black stroke-black"
		/>
	</div>
</div>
