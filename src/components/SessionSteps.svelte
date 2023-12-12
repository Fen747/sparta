<script lang="ts">
	import Typography from './Global/Typography.svelte';
	import IconEllipse from './Icons/IconEllipse.svelte';
	import clsx from 'clsx';

	interface $$Props {
		count: number;
		total: number;
		showText?: boolean;
	}

	export let count: $$Props['count'];
	export let total: $$Props['total'];
	export let showText: $$Props['showText'] = false;

	const delta = total - count;
	const text = delta === 0 ? 'Dernière séance' : 'Avant-dernière séance';
</script>

<div
	class={clsx(
		showText ? 'gap-2' : 'gap-1.5',
		'flex items-center justify-center w-max'
	)}
>
	{#if delta < 2}
		<div class="flex gap-1.5 items-center">
			<IconEllipse
				viewBox="0 0 8 8"
				width="8"
				height="8"
				class={clsx('w-2 h-2', delta ? 'fill-warning-600' : 'fill-rose-600')}
			/>
			{#if showText}
				<Typography
					as="span"
					color={delta === 0 ? 'rose-600' : 'warning-600'}
					variant="xs"
					class="font-semibold">{text}</Typography
				>
			{/if}
		</div>
	{/if}
	<Typography
		as="p"
		variant="xs"
		class={clsx(
			{
				'font-medium': showText
			},
			'whitespace-nowrap'
		)}
		color={!showText
			? delta
				? delta === 1
					? 'warning-600'
					: 'gray-600'
				: 'rose-600'
			: 'gray-800'}
	>
		Séance:
		<span class="font-semibold">
			{count}/{total}
		</span>
	</Typography>
</div>
