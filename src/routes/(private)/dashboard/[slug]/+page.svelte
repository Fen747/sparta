<script lang="ts">
	import IconPlus from '~/components/Icons/IconPlus.svelte';
	import Input from '~/components/Input/Input.svelte';
	import ParticipantCard from '~/components/ParticipantCard/ParticipantCard.svelte';
	import ScheduleCard from '~/components/ScheduleCard.svelte';
	import ModalFreeSceance from '~/components/Modal/ModalFreeSceance.svelte';
	import type { PageData } from './$types';
	import { APP_NAME } from '~/lib/consts';
	import IconMapPin from '~/components/Icons/IconMapPin.svelte';
	import Typography from '~/components/Global/Typography.svelte';

	export let data: PageData;

	const {
		clientsInfos,
		clientsEvents: clientEvents,
		filteredEvents: todayEvent,
		disciplines,
		structures,
		coaches
	} = data;
	const primaryClient = clientsInfos?.[0];
	const event = todayEvent?.[0];

	const todayCount = clientEvents?.find((item) => item.key_event === event?.id);
	const nextCount = clientEvents?.find(
		(item) => item.count === todayCount?.count + 1
	);
	const coach = coaches.find(
		(coach) => coach.id === todayEvent?.[0]?.key_coach
	);
	const discipline = disciplines.find(
		(discipline) => discipline.id === event?.key_disc
	);
	const location = structures.find(
		(location) => location.id === primaryClient?.key_str
	);

	let show = false;

	const toggleModal = () => {
		show = !show;
	};
</script>

<svelte:head>
	<title>Modif - {APP_NAME}</title>
</svelte:head>
<div class="bg-white p-4 shadow-md rounded-lg">
	<!--  a trouver le pencil icon-->
	<div class="flex justify-between items-center mb-4">
		<h1 class="text-xl font-semibold text-gray-800">Coaching</h1>

		<button class="text-gray-500 cursor-pointer" on:click={toggleModal}>
			<IconPlus />
		</button>
	</div>

	<div class="border-b pb-4 mb-4">
		<ScheduleCard
			date={event?.date}
			time={event?.time}
			duration={event?.duration}
			sessionTotal={todayCount?.events}
			sessionCurrent={todayCount?.count}
			coach={`${coach?.firstname} ${coach?.name}`}
			sessionStatus="coming"
		/>
	</div>

	<!-- Participant  -->
	<div class="border-b pb-4 mb-4">
		<ParticipantCard
			participants={1}
			variant="coaching"
			presenceInformation={todayCount?.attendance}
			hideCTAs={false}
			clientName={`${primaryClient?.firstname} ${primaryClient?.name}`}
			phoneNumber={primaryClient?.phone_mobile}
			clientId={Number(primaryClient?.id)}
		/>
	</div>

	<!-- Recurrence  -->

	<div>
		<!-- <RecurrenceCard /> -->
	</div>
	<!-- {#if secondSession}
		<div class="border-b pb-4 mb-4">
			<RecurrenceCard
				on:openModalFreeSeance={handleOpenModalFreeSeance}
				productLabel={secondSession.eventDetails[0].productLabel}
				isTeamTraining={false}
				nextEvent={secondSession.eventDetails[0]}
			/>
		</div>
	{/if} -->
	<!-- inpout  -->

	<div class="flex">
		<IconMapPin
			class="mr-2"
			stroke="#31312F"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="none"
		/>
		<Typography>
			{location?.label}
		</Typography>
	</div>

	<div class="border-b pb-4 mb-4">
		<Input type="text" label="Notes" left class="shadow-custom" />
	</div>
</div>

{#if show}
	<ModalFreeSceance
		isFreeSlot={true}
		bind:show
		{data}
		structures={data.structures}
		rooms={data.rooms}
		{coaches}
	/>
{/if}
