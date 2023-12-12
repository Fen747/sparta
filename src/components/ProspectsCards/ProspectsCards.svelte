<script lang="ts">
	import clsx from 'clsx';
	import Typography from '~/components/Global/Typography.svelte';
	import IconPlus from '~/components/Icons/IconPlus.svelte';
	import IconUserCircle from '~/components/Icons/IconUserCircle.svelte';
	import IconEllipse from '~/components/Icons/IconEllipse.svelte';
	import IconCornerDownRight from '~/components/Icons/IconCornerDownRight.svelte';

	interface $$Props {
		firstName: string;
		lastName: string;
		addedBy?: string | number;
		transferredBy?: string;
		referentCoach: string;
		bilanCompleted?: boolean;
		dashboard?: boolean;
	}

	export let firstName: $$Props['firstName'];
	export let lastName: $$Props['lastName'];
	export let addedBy: $$Props['addedBy'] = '';
	export let transferredBy: $$Props['transferredBy'] = '';
	export let referentCoach: $$Props['referentCoach'];
	export let bilanCompleted: $$Props['bilanCompleted'] = false;
	export let dashboard: $$Props['dashboard'] = false;

	const variants = bilanCompleted
		? {
				bgColor: 'bg-success-100',
				textColor: 'text-success-700',
				text: 'Séance bilan fixée'
		  }
		: {
				bgColor: 'bg-rose-100',
				textColor: 'text-rose-700',
				text: 'Séance bilan à établir'
		  };

	const info = addedBy
		? {
				icon: IconPlus,
				label: 'Ajouté par',
				value: addedBy
		  }
		: transferredBy
		? {
				icon: IconCornerDownRight,
				label: 'Transféré par',
				value: transferredBy
		  }
		: null;
</script>

<div
	class={clsx(
		'flex-shrink-0 border border-gray-100 bg-white rounded-lg p-4 shadow-custom',
		dashboard ? 'w-70' : null
	)}
>
	<div class="flex justify-between items-center">
		<Typography as="p" variant="sm" class="font-semibold text-gray-900">
			{firstName}
			{lastName}
		</Typography>
		{#if !bilanCompleted}
			<div
				class="px-2 py-0.5 flex w-max gap-1.5 items-center justify-center rounded-[0.375rem] bg-success-50"
			>
				<IconEllipse
					viewBox="0 0 8 8"
					width="8"
					height="8"
					class="w-2 h-2 fill-success-500"
				/>
				<Typography as="span" variant="xs" class="font-medium text-success-700">
					Nouveau
				</Typography>
			</div>
		{/if}
	</div>
	<div class="flex flex-col mt-2">
		{#if info}
			<div class="flex text-gray-600 font-medium items-center">
				<svelte:component this={info.icon} class="mr-2" fill={'#70706B'} />
				<Typography as="span" variant="xs">
					{info.label} :<span class="font-semibold ml-1"> {info.value}</span>
				</Typography>
			</div>
		{/if}
		<div class="flex mt-1 text-gray-600 font-medium items-center">
			<IconUserCircle class="mr-2" fill={'#70706B'} />
			<Typography as="span" variant="xs">
				Coach référent :<span class="font-semibold ml-1"> {referentCoach}</span>
			</Typography>
		</div>
	</div>
	<div
		class={clsx(
			'mt-2 px-2 py-0.5 flex w-max gap-1.5 items-center justify-center rounded-[0.375rem]',
			variants.bgColor
		)}
	>
		<Typography
			as="span"
			variant="xs"
			class={clsx('font-semibold', variants.textColor)}
		>
			{variants.text}
		</Typography>
	</div>
</div>
