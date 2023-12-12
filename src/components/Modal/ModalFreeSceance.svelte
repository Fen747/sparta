<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Coaches, Structures, Rooms, Events } from '$lib/api-sdk/types';
	import Input from '../Input/Input.svelte';
	import ModalContainer from './ModalContainer.svelte';
	import InputDropdown, { type Options } from '../Input/InputDropdown.svelte';
	import Typography from '../Global/Typography.svelte';
	import type { PageData as PageDataPresta } from '../../routes/(private)/clients/prospect-details/[slug]/[idPresta]/$types';
	import type { PageData as PageDataDashboard } from '../../routes/(private)/dashboard/[slug]/$types';

	interface $$Props {
		isFreeSlot?: boolean;
		show: boolean;
		coaches: Coaches[];
		structures: Structures[];
		rooms: Rooms[];
		createNewSeance?: boolean;
		data?: PageDataPresta;
	}

	export let data: $$Props['data'];
	export let show: $$Props['show'];
	export let isFreeSlot: $$Props['isFreeSlot'] = false;
	export let createNewSeance: $$Props['createNewSeance'] = false;
	export let structures: $$Props['structures'] = [];
	export let coaches: $$Props['coaches'];
	export let rooms: $$Props['rooms'] = [];

	let timeOptions = [
		{ label: '6:00', value: '6:00' },
		{ label: '7:00', value: '7:00' },
		{ label: '8:00', value: '8:00' },
		{ label: '9:00', value: '9:00' },
		{ label: '10:00', value: '10:00' },
		{ label: '11:00', value: '11:00' },
		{ label: '12:00', value: '12:00' },
		{ label: '13:00', value: '13:00' },
		{ label: '14:00', value: '14:00' },
		{ label: '15:00', value: '15:00' },
		{ label: '16:00', value: '16:00' },
		{ label: '17:00', value: '17:00' },
		{ label: '18:00', value: '18:00' },
		{ label: '19:00', value: '19:00' }
	];

	let centerOptions = structures?.map((structure) => ({
		label: structure.label,
		value: structure.id
	}));
	let coachOptions = coaches.map((coach) => ({
		label: `${coach.firstname} ${coach.name}`,
		value: coach.id
	}));

	let selectedStartTime = timeOptions[0].value;
	let selectedEndTime = timeOptions[1].value;

	let selectedCenter = structures[0]?.id || '';

	let formRef!: HTMLFormElement;

	let roomOptions: Options[] = [];

	$: if (selectedCenter) {
		roomOptions = rooms
			.filter((room) => room.key_str === selectedCenter)
			.map((room) => ({
				label: room.label,
				value: room.id
			}));
	}

	let sessionDuration = '';
	let durationInHours = 0;
	let durationInSecondes = 0;
	$: if (selectedStartTime && selectedEndTime) {
		durationInHours =
			parseInt(selectedEndTime, 10) - parseInt(selectedStartTime, 10);
	}

	$: sessionDuration = `${durationInHours} heure${
		durationInHours > 1 ? 's' : ''
	}`;

	$: durationInSecondes = durationInHours * 60 * 60;

	let keyDisc = data?.eventsOfClient?.[0]?.key_disc ?? -1; // -1 = error
	let keyProduct = data?.eventsOfClient?.[0]?.key_product ?? -1;
	let keyCoach = coaches[0]?.id;
	let keyRoom = rooms[0]?.id;
	let date = '';
	let type = data?.eventsOfClient?.[0]?.type;
	let state = data?.eventsOfClient[0]?.state;
	let infos = data?.eventsOfClient?.[0]?.infos;
	let specifics = data?.eventsOfClient?.[0]?.specifics;
	$: time = parseInt(selectedStartTime, 10) * 60 * 60;

	const handleSubmit = () => {
		if (durationInSecondes <= 0) return false; // handle negative time case
		formRef.submit();
	};
</script>

<ModalContainer
	bind:show
	hideIcon
	closable
	variant="reason"
	header={createNewSeance
		? isFreeSlot
			? 'Ajouter une séance offerte'
			: 'Ajouter une scéance'
		: 'Modifier la scéance'}
	footer={{
		action: {
			label: createNewSeance ? 'Valider' : 'Enregistrer les changements',
			onConfirm: handleSubmit
		},
		cancel: {
			label: createNewSeance ? 'Abandonner' : 'Annuler la séance'
		}
	}}
>
	<div class="modal-content w-full h-full p-4">
		<form
			use:enhance
			method="post"
			action="/api/form-seance"
			bind:this={formRef}
		>
			<input hidden type="text" name="key_disc" value={keyDisc} />
			<input hidden type="text" name="key_disc" value={keyDisc} />
			<input hidden type="text" name="key_product" value={keyProduct} />
			<input hidden type="text" name="duration" value={durationInSecondes} />
			<input hidden type="text" name="type" value={type} />
			<input hidden type="text" name="state" value={state} />
			<input hidden type="text" name="infos" value={infos} />
			<input hidden type="text" name="specifics" value={specifics} />
			<input hidden type="text" name="time" value={time} />
			<input
				hidden
				type="text"
				name="key_client"
				value={data?.slugs.keyClient}
			/>
			<input
				hidden
				type="text"
				name="key_presta"
				value={data?.slugs.keyPresta}
			/>
			<input hidden type="text" name="attendance" value={2} />

			<Input
				bind:value={date}
				type="date"
				label="Sélectionnez un jour"
				name="date"
			/>
			<div class="flex space-x-4">
				<InputDropdown
					label="Débute à"
					options={timeOptions}
					bind:value={selectedStartTime}
					name="startTime"
				/>
				<InputDropdown
					label="Finit à"
					options={timeOptions}
					bind:value={selectedEndTime}
					name="endTime"
				/>
			</div>
			<div class="my-4">
				<Typography as="p">La séance dure de temps {sessionDuration}</Typography
				>
			</div>
			<InputDropdown
				label="Séance effectuée par"
				options={coachOptions}
				bind:value={keyCoach}
				name="key_coach"
			/>
			<InputDropdown
				label="Dans le centre"
				options={centerOptions}
				bind:value={selectedCenter}
			/>
			<InputDropdown
				label="Salle"
				options={roomOptions}
				bind:value={keyRoom}
				name="key_room"
			/>
		</form>
	</div>
</ModalContainer>
