<script lang="ts">
	import { clsx } from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	type TypographyColors =
		| 'gray-25'
		| 'gray-50'
		| 'gray-100'
		| 'gray-200'
		| 'gray-300'
		| 'gray-400'
		| 'gray-500'
		| 'gray-600'
		| 'gray-700'
		| 'gray-800'
		| 'gray-900'
		| 'rose-25'
		| 'rose-50'
		| 'rose-100'
		| 'rose-200'
		| 'rose-300'
		| 'rose-400'
		| 'rose-500'
		| 'rose-600'
		| 'rose-700'
		| 'rose-800'
		| 'rose-900'
		| 'orange-600'
		| 'red-600'
		| 'warning-25'
		| 'warning-50'
		| 'warning-100'
		| 'warning-200'
		| 'warning-300'
		| 'warning-400'
		| 'warning-500'
		| 'warning-600'
		| 'warning-700'
		| 'warning-800'
		| 'warning-900'
		| 'success-25'
		| 'success-50'
		| 'success-100'
		| 'success-200'
		| 'success-300'
		| 'success-400'
		| 'success-500'
		| 'success-600'
		| 'success-700'
		| 'success-800'
		| 'success-900'
		| 'bluegray-25'
		| 'bluegray-50'
		| 'bluegray-100'
		| 'bluegray-200'
		| 'bluegray-300'
		| 'bluegray-400'
		| 'bluegray-500'
		| 'bluegray-600'
		| 'bluegray-700'
		| 'bluegray-800'
		| 'bluegray-900'
		| 'bluelight-25'
		| 'bluelight-50'
		| 'bluelight-100'
		| 'bluelight-200'
		| 'bluelight-300'
		| 'bluelight-400'
		| 'bluelight-500'
		| 'bluelight-600'
		| 'bluelight-700'
		| 'bluelight-800'
		| 'bluelight-900'
		| 'white'
		| 'black'
		| null;

	type TypographyVariants = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null;

	interface $$Props extends HTMLAttributes<HTMLElement> {
		as?: string;
		color?: TypographyColors;
		variant?: TypographyVariants;
	}

	export let { color = null, variant = null, as = 'span' }: $$Props = {};

	const colors = {
		'gray-25': 'text-gray-25',
		'gray-50': 'text-gray-50',
		'gray-100': 'text-gray-100',
		'gray-200': 'text-gray-200',
		'gray-300': 'text-gray-300',
		'gray-400': 'text-gray-400',
		'gray-500': 'text-gray-500',
		'gray-600': 'text-gray-600',
		'gray-700': 'text-gray-700',
		'gray-800': 'text-gray-800',
		'gray-900': 'text-gray-900',
		'rose-25': 'text-rose-25',
		'rose-50': 'text-rose-50',
		'rose-100': 'text-rose-100',
		'rose-200': 'text-rose-200',
		'rose-300': 'text-rose-300',
		'rose-400': 'text-rose-400',
		'rose-500': 'text-rose-500',
		'rose-600': 'text-rose-600',
		'rose-700': 'text-rose-700',
		'rose-800': 'text-rose-800',
		'rose-900': 'text-rose-900',
		'orange-600': 'text-orange-600',
		'red-600': 'text-red-600',
		'warning-25': 'text-warning-25',
		'warning-50': 'text-warning-50',
		'warning-100': 'text-warning-100',
		'warning-200': 'text-warning-200',
		'warning-300': 'text-warning-300',
		'warning-400': 'text-warning-400',
		'warning-500': 'text-warning-500',
		'warning-600': 'text-warning-600',
		'warning-700': 'text-warning-700',
		'warning-800': 'text-warning-800',
		'warning-900': 'text-warning-900',
		'success-25': 'text-success-25',
		'success-50': 'text-success-50',
		'success-100': 'text-success-100',
		'success-200': 'text-success-200',
		'success-300': 'text-success-300',
		'success-400': 'text-success-400',
		'success-500': 'text-success-500',
		'success-600': 'text-success-600',
		'success-700': 'text-success-700',
		'success-800': 'text-success-800',
		'success-900': 'text-success-900',
		'bluegray-25': 'text-bluegray-25',
		'bluegray-50': 'text-bluegray-50',
		'bluegray-100': 'text-bluegray-100',
		'bluegray-200': 'text-bluegray-200',
		'bluegray-300': 'text-bluegray-300',
		'bluegray-400': 'text-bluegray-400',
		'bluegray-500': 'text-bluegray-500',
		'bluegray-600': 'text-bluegray-600',
		'bluegray-700': 'text-bluegray-700',
		'bluegray-800': 'text-bluegray-800',
		'bluegray-900': 'text-bluegray-900',
		'bluelight-25': 'text-bluelight-25',
		'bluelight-50': 'text-bluelight-50',
		'bluelight-100': 'text-bluelight-100',
		'bluelight-200': 'text-bluelight-200',
		'bluelight-300': 'text-bluelight-300',
		'bluelight-400': 'text-bluelight-400',
		'bluelight-500': 'text-bluelight-500',
		'bluelight-600': 'text-bluelight-600',
		'bluelight-700': 'text-bluelight-700',
		'bluelight-800': 'text-bluelight-800',
		'bluelight-900': 'text-bluelight-900',
		white: 'text-white',
		black: 'text-black'
	};

	const variants = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl'
	};

	$: styles = clsx(
		$$props.class,
		color && colors[color],
		variant && variants[variant]
	);
</script>

<svelte:element this={as} {...$$restProps} class={styles}>
	<slot />
</svelte:element>
