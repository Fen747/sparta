<script lang="ts">
	import clsx from 'clsx';
	import Typography from '../Global/Typography.svelte';
	import IconCheck from '../Icons/IconCheck.svelte';
	import type { SvelteComponent, ComponentType, ComponentProps } from 'svelte';
	import type ModalReason from '../Modal/ModalReason.svelte';
	import IconChevronDown from '../Icons/IconChevronDown.svelte';
	import type { ParticipantCardPrecenseInformation } from '~/lib/types';

	type Constraint = SvelteComponent<ComponentProps<ModalReason>>;

	interface $$Props {
		text: string;
		presenceInformation?: ParticipantCardPrecenseInformation;
		modalComponent?: ComponentType<Constraint> | null;
	}

	export let modalComponent: $$Props['modalComponent'] = null;
	export let presenceInformation: $$Props['presenceInformation'] = null;
	export let text: $$Props['text'];

	let showModal: boolean = false;

	$: ModalComponent = modalComponent; // Maybe a better way to do in order to rename in Pascal case the component

	$: buttonClasses = clsx(
		'gap-2 rounded-[2.5rem] border-solid border-gray-300 py-[6px] px-4 flex',
		{
			'bg-bluelight-100': isActive,
			border: !isActive
		}
	);

	$: isActive = ModalComponent
		? !!presenceInformation?.cancellationReason ||
		  presenceInformation?.presence === false
		: presenceInformation?.presence;

	const handleClick = () => {
		if (ModalComponent) {
			showModal = true;
		} else {
			presenceInformation = presenceInformation?.presence
				? null
				: { presence: true };
		}
	};
</script>

<button on:click={handleClick} type="button" class={buttonClasses}>
	<Typography
		color={isActive ? 'bluelight-700' : 'gray-700'}
		variant="xs"
		class="font-medium"
	>
		{text}
		{#if ModalComponent && presenceInformation?.cancellationReason}
			<span>: {presenceInformation?.cancellationReason}</span>
		{/if}
	</Typography>
	{#if ModalComponent}
		<div class="border border-gray-300 self-stretch" />
		<IconChevronDown
			class={clsx(
				isActive ? 'stroke-bluelight-700' : 'stroke-gray-700',
				'h-5 w-5'
			)}
		/>
	{/if}
	{#if isActive && !ModalComponent}
		<IconCheck class={clsx('stroke-bluelight-700 h-5 w-5')} />
	{/if}
</button>

{#if ModalComponent}
	<svelte:component
		this={ModalComponent}
		bind:presenceInformation
		bind:show={showModal}
	/>
{/if}
