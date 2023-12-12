<script lang="ts">
	import fr from 'date-fns/locale/fr';
	import { format } from 'date-fns';
	import { secondsToTime } from '~/lib/utils';

	import Typography from '../Global/Typography.svelte';
	import IconCalendar from '../Icons/IconCalendar.svelte';
	import IconClockFastForward from '../Icons/IconClockFastForward.svelte';
	import IconSearch from '../Icons/IconSearch.svelte';
	import IconUser from '../Icons/IconUser.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const openModal = () => {
		dispatch('openModalFreeSeance');
	};
	// If no next event, we trigger the variant without event coming.
	type NextEventType = {
		date: string;
		time: number;
		duration: number;
		coach: string;
		isOffer?: boolean;
	};

	interface $$Props {
		isTeamTraining?: boolean;
		productLabel: string;
		nextEvent?: NextEventType | null;
	}

	export let productLabel: $$Props['productLabel'];
	export let isTeamTraining: $$Props['isTeamTraining'] = false;
	export let nextEvent: $$Props['nextEvent'] = null;

	const formatedDate =
		nextEvent &&
		format(new Date(nextEvent.date), 'EEEE d MMMM', {
			locale: fr
		});

	const startTime = nextEvent && secondsToTime(nextEvent.time);
	const endTime =
		nextEvent && secondsToTime(nextEvent.time + nextEvent.duration);

	const subHeadingText = nextEvent
		? nextEvent?.isOffer
			? 'Séance offerte'
			: ''
		: 'Pas de prochaine séance';
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center gap-2">
		<IconClockFastForward />
		<Typography variant="sm" color="gray-900" class="font-medium">
			{productLabel}
		</Typography>
	</div>
	<div class="p-3 bg-gray-50 rounded-[0.25rem]">
		{#if isTeamTraining}
			<div class="flex justify-between items-center">
				<div class="flex flex-col gap-1">
					<Typography class="font-medium" variant="xs" color="gray-600"
						>Prochaine séance</Typography
					>
					<Typography
						class="font-semibold first-letter:uppercase"
						variant="xs"
						color="gray-800">{formatedDate}</Typography
					>
					<Typography class="font-semibold" variant="xs" color="gray-800"
						>{startTime} - {endTime}</Typography
					>
				</div>
				<button
					class="p-2 flex items-center justify-center bg-gray-200 rounded-lg"
				>
					<IconSearch class="h-5 w-5" />
				</button>
			</div>
		{:else}
			<div class="flex flex-col gap-3">
				<div class="flex justify-between items-center">
					<div class="flex flex-col gap-1">
						<Typography class="font-medium" variant="xs" color="gray-600"
							>Prochaine séance</Typography
						>
						{#if subHeadingText}
							<Typography
								as="span"
								class="font-semibold"
								variant="xs"
								color="gray-800">{subHeadingText}</Typography
							>
						{/if}
					</div>

					{#if nextEvent && !nextEvent.isOffer}
						<button
							class="p-2 flex items-center justify-center bg-gray-200 rounded-lg"
						>
							<IconSearch class="h-5 w-5" />
						</button>
					{/if}
				</div>

				{#if nextEvent?.isOffer}
					<!-- TODO: insert component Seance Card -->
					<div>[insert component Seance Card]</div>
				{:else if nextEvent}
					<div class="flex flex-col gap-1">
						<div class="flex gap-2 items-center">
							<IconCalendar class="h-3 w-3" />
							<Typography
								class="flex gap-2 font-semibold"
								as="span"
								variant="xs"
								color="gray-800"
							>
								<span class="first-letter:uppercase">
									{formatedDate}
								</span>
								<span>-</span>
								<span>
									{startTime} - {endTime}
								</span>
							</Typography>
						</div>
						<div class="flex gap-2 items-center">
							<IconUser class="h-3 w-3" />
							<Typography
								class="font-semibold"
								as="span"
								variant="xs"
								color="gray-800"
							>
								Coach:
							</Typography>
							<Typography
								class="font-semibold"
								as="span"
								variant="xs"
								color="gray-800"
							>
								{nextEvent?.coach}
							</Typography>
						</div>
					</div>
				{:else}
					<button
						type="button"
						class="flex gap-2 justify-center items-center w-full py-2.5 px-4 rounded-lg bg-gray-200"
						on:click={openModal}
					>
						<IconCalendar fill="#363F72" class="h-5 w-5" />
						<Typography
							variant="sm"
							color="gray-700"
							as="span"
							class="font-semibold"
						>
							Ajouter une séance offerte</Typography
						>
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
