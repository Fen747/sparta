<script lang="ts">
	import ScheduleCard from '~/components/ScheduleCard.svelte';
	import type { PageData } from './$types';
	import Typography from '~/components/Global/Typography.svelte';
	import IconClockFastForward from '~/components/Icons/IconClockFastForward.svelte';
	import IconCalendar from '~/components/Icons/IconCalendar.svelte';
	import IconLoading from '~/components/Icons/IconLoading.svelte';
	import IconMapPin from '~/components/Icons/IconMapPin.svelte';
	import IconMenu from '~/components/Icons/IconMenu.svelte';
	import Button from '~/components/Button/Button.svelte';
	import ModalFreeSceance from '~/components/Modal/ModalFreeSceance.svelte';

	export let data: PageData;

	let showModalFreeSceance: boolean = false;
	const handleOpenModalFreeSeance = () => {
		showModalFreeSceance = true;
	};
	// REMPLACEMENT DE L'ID COACH PAR SA VALEUR TEXTUELLE
	const updatedCoaches = data.getReady.map((obj) => {
		const coach = data.coaches.find((coach) => coach.id === obj.key_coach);
		if (coach) {
			return {
				...obj,
				key_coach: `${coach?.firstname} ${coach?.name}`
			};
		} else {
			return {
				...obj,
				key_coach: coach?.id
			};
		}
	});

	let isFreeSlot = false; // todo

	// REMPLACEMENT DE L'ID DE LA STRUCTURE PAR SA VALEUR TEXTUELLE
	const updatedStructure = data.structures.find(
		(structure) => structure.id === data.client[0].key_str
	);

	//REMPLACEMENT DE L'ID PRODUCT PAR SA VALEUR TEXTUELLE
	const updatedProduct = data.products.find(
		(product) => product.id === updatedCoaches[0].key_product
	);
</script>

<div class="mx-4 mt-4 flex flex-col gap-y-8">
	<div class="mt-8">
		<Typography variant="lg" class="mb-2 font-semibold"
			>Séances de coaching</Typography
		>
		<div class="flex mt-4">
			<IconClockFastForward class="mr-2" />
			<Typography variant="sm" color="gray-800"
				>{updatedProduct.label}</Typography
			>
		</div>

		<div class="flex mt-1">
			<IconLoading
				class="mr-2"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<Typography variant="sm" color="gray-800">seance 2/16</Typography>
		</div>
		<div class="mt-8 flex">
			<IconMapPin
				class="mr-2"
				stroke="#31312F"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
			/>
			<Typography variant="sm" color="gray-900" class="font-medium"
				>{updatedStructure.label}</Typography
			>
		</div>
		<div class="mt-8 flex items-center">
			<IconMenu
				class="mr-2"
				stroke="#31312F"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<Typography class="font-medium">Liste des séances plannifiées</Typography>
		</div>
		<Button
			variant="primary"
			class="mt-4 w-90 "
			onClick={handleOpenModalFreeSeance}>Ajouter une séance</Button
		>
	</div>
	<div class="mb-30">
		{#each updatedCoaches as event}
			<div class="my-2">
				<ScheduleCard
					date={event.date}
					duration={event.duration}
					time={event.time}
					sessionStatus={event.attendance === 'Présence'
						? 'completed'
						: event.attendance === 'Excuse'
						? 'canceled'
						: 'coming'}
					sessionCurrent={event.count}
					sessionTotal={event.events}
					coach={event.key_coach}
				/>
			</div>
		{/each}
	</div>
</div>

{#if showModalFreeSceance}
	<ModalFreeSceance
		{isFreeSlot}
		bind:show={showModalFreeSceance}
		{data}
		structures={data.structures}
		rooms={data.rooms}
		coaches={data.coaches}
	/>
{/if}
