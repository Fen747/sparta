<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLAttributes } from 'svelte/elements';

	import type { TagStatus } from '~/lib/types';

	import IconHourGlass from '../Icons/IconHourGlass.svelte';
	import IconCircle from '../Icons/IconCircle.svelte';
	import IconXCircle from '../Icons/IconXCircle.svelte';
	import IconCheckCircle from '../Icons/IconCheckCircle.svelte';
	import Typography from '../Global/Typography.svelte';

	interface $$Props extends HTMLAttributes<HTMLButtonElement> {
		status: TagStatus;
		icon?: boolean;
		small?: boolean;
	}

	export let status: $$Props['status'];
	export let icon: $$Props['icon'] = false;
	export let small: $$Props['small'] = false;

	const variants = {
		coming: {
			icon: IconHourGlass,
			svgClasses: 'stroke-bluegray-600 fill-bluegray-600',
			wrapperClasses: 'bg-bluegray-100',
			textColor: 'text-bluegray-700',
			text: 'À venir'
		},
		canceled: {
			icon: IconXCircle,
			svgClasses: 'stroke-rose-600 fill-rose-600',
			wrapperClasses: 'bg-rose-100',
			textColor: 'text-rose-700',
			text: 'Annulée'
		},
		done: {
			icon: IconCircle,
			svgClasses: 'stroke-success-600 fill-success-600',
			wrapperClasses: 'bg-success-100',
			textColor: 'text-success-700',
			text: 'Terminée'
		},
		completed: {
			icon: IconCheckCircle,
			svgClasses: 'stroke-success-600 fill-success-600',
			wrapperClasses: 'bg-success-100',
			textColor: 'text-success-700',
			text: 'Terminée et validée'
		},
		aVenir: {
			wrapperClasses: 'bg-rose-100',
			textColor: 'text-rose-700',
			text: 'Séance bilan à établir'
		},
		fixee: {
			wrapperClasses: 'bg-success-100',
			textColor: 'text-success-700',
			text: 'Séance bilan fixée'
		},
		aFixer: {
			wrapperClasses: 'bg-rose-100',
			textColor: 'text-rose-700',
			text: 'Séance bilan à fixer'
		}
	};
</script>

<div
	class={clsx(
		small ? 'px-2 py-0.5' : 'px-3 py-1',
		'flex w-max gap-1.5 items-center justify-center rounded-[0.25rem]',
		variants[status].wrapperClasses
	)}
	{...$$restProps}
>
	{#if icon && variants[status]?.icon}
		<svelte:component
			this={variants[status].icon}
			class={clsx(
				small ? 'h-3 w-3' : 'h-3.5 w-3.5',
				variants[status].svgClasses
			)}
		/>
	{/if}
	<Typography
		as="span"
		variant={small ? 'xs' : 'sm'}
		class={clsx('font-semibold', variants[status].textColor)}
	>
		{variants[status].text}
	</Typography>
</div>
