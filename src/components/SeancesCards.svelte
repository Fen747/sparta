<script lang="ts">
	import clsx from 'clsx';
	import SessionSteps from '~/components/SessionSteps.svelte';
	import Tag from '~/components/Tag/Tag.svelte';
	import Typography from '~/components/Global/Typography.svelte';
	import { goto } from '$app/navigation';
	import type { TagStatus } from '~/lib/types';
	import IconUser from './Icons/IconUser.svelte';

	interface SessionProps {
		firstname: string;
		name: string;
		coachName: string;
		subject: string;
		status: TagStatus;
		place?: string;
		address?: string;
		isSessionStep?: boolean;
		panelManager?: boolean;
		hourBegin?: string;
		hourEnd?: string;
		date?: string;
		sessionType?:
			| 'Séance coaching'
			| 'Bilan initial'
			| 'Coaching En Entreprise'
			| 'Location de poste'
			| 'Team training en extérieur'
			| 'Small groupe privé';
		entrepriseName?: string;
		recapitulatif?: boolean;
	}

	const iconClicked = () => {};
	export let props: SessionProps;
	export let slug: string;
	export let clickable: boolean;

	$: canceledClass = props.status === 'canceled' ? 'opacity-50' : '';

	const navigateToDetails = () => {
		if (clickable) {
			goto(`/dashboard/${slug}`);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={clsx(
		'border border-gray-100 shadow p-3 bg-white rounded-lg w-full',
		canceledClass
	)}
	on:click={navigateToDetails}
>
	{#if props.recapitulatif}
		<!-- Recapitulatif mode -->
		<div class="flex flex-col h-full justify-between">
			<div class="flex justify-between">
				<Typography as="div" variant="sm" class="font-bold">
					{props.date}
				</Typography>
				<IconUser />
				<!--  truc iconsearch avec on click qui <a> un [slug] -->
			</div>
			<Typography as="div" variant="sm" class="font-bold">
				{props.hourBegin} - {props.hourEnd}
			</Typography>
			<SessionSteps
				count={props.count}
				total={props.total}
				showText={props.showText}
			/>
			<div class="flex justify-between items-end">
				<Typography as="div" variant="xs">
					Coach: {props.coachName}</Typography
				>
				<Tag status={props.status}>{props.status}</Tag>
			</div>
		</div>
	{:else}
		<!-- by default -->
		<div class="flex justify-between">
			<Typography as="div" variant="sm" class="font-bold">
				{#if props.sessionType === 'Séance coaching' || props.sessionType === 'Bilan initial'}
					{props.name} {props.firstname}
				{:else if props.sessionType === 'Coaching En Entreprise'}
					{props.entrepriseName}
				{:else if props.sessionType === 'Small groupe privé'}
					Small groupe privé
				{:else}
					Team training
				{/if}
			</Typography>
			{#if props.isSessionStep}
				<SessionSteps
					count={props.count}
					total={props.total}
					showText={props.showText}
				/>
			{/if}
		</div>
		{#if props.sessionType === 'Séance coaching'}
			<div class="mt-2">
				<Typography as="div" variant="xs">
					{props.sessionType}
					{props.coachName && `par ${props.coachName}`}
				</Typography>
				<Typography as="div" variant="xs" class="font-semibold text-gray-600">
					Centre de {props.address}
				</Typography>
			</div>
		{/if}
		{#if props.sessionType === 'Bilan initial'}
			<Typography as="div" variant="xs" class="mt-2">Bilan initial</Typography>
		{/if}
		{#if props.sessionType === 'Team training en extérieur' || props.sessionType === 'Small groupe privé'}
			<Typography as="div" variant="xs" class="mt-2">
				{props.address}
			</Typography>
		{/if}
		<div class="flex justify-between mt-2 items-center">
			<Typography as="div" variant="xs">
				{props.hourBegin} - {props.hourEnd}
			</Typography>
			<!-- <Tag status={props.status} icon={true} small={false} /> -->
		</div>
	{/if}
</div>
