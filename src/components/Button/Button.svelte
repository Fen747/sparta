<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import type Icon from '../Icons/Icon.svelte';

	type Constraint = SvelteComponent<ComponentProps<Icon>>;
	interface $$Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'ghost' | 'cancel' | 'cancel-ghost';
		IconComponent?: ComponentType<Constraint> | null;
		onClick?: () => void;
	}

	export let {
		variant = 'primary',
		IconComponent = null,
		onClick
	}: $$Props = {};

	const variantStyles = {
		primary:
			'bg-gray-900 hover:bg-gray-700 text-white outline-stone-300 focus:outline outline-2 disabled:bg-gray-300',
		secondary:
			'bg-gray-200 hover:bg-gray-300 text-gray-700 outline-stone-200 focus:outline outline-2 disabled:text-white',
		ghost:
			'bg-white text-gray-700 border border-gray-300 outline-stone-200 focus:outline outline-2 hover:text-gray-800 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-300',
		'cancel-ghost':
			'bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 outline-rose-200 focus:outline outline-2 disabled:opacity-50',
		cancel:
			'bg-rose-600 text-white hover:bg-rose-500 outline-rose-200 focus:outline outline-2 disabled:opacity-50'
	};

	const svgClasses = {
		primary: 'fill-white stroke-white',
		secondary: clsx(
			$$props.disabled
				? 'fill-white stroke-white'
				: 'fill-gray-700 stroke-gray-700'
		),
		ghost: clsx(
			$$props.disabled
				? 'fill-gray-300 stroke-gray-300'
				: 'fill-gray-700 stroke-gray-700'
		),
		'cancel-ghost': 'fill-rose-600 stroke-rose-600',
		cancel: 'fill-white stroke-white'
	};

	const styles = clsx(
		$$props.class,
		variantStyles[variant],
		'rounded-lg flex gap-2 py-2.5 px-4.5 items-center justify-center'
	);
</script>

<button {...$$restProps} on:click={onClick} class={styles}>
	{#if IconComponent}
		<svelte:component
			this={IconComponent}
			class={clsx('h-5 w-5', svgClasses[variant])}
		/>
	{/if}
	<slot />
</button>
