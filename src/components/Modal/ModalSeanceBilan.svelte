<script lang="ts">
	import InputDropdown from '../Input/InputDropdown.svelte';
	import ModalContainer from './ModalContainer.svelte';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/$types';
	import Input from '../Input/Input.svelte';
	import Typography from '../Global/Typography.svelte';
	import IconHourGlass from '../Icons/IconHourGlass.svelte';

	export let showSeanceBilanModal: boolean;
	export let options: string[];
	export let options2: { label: string; id: number }[];
	export let options3: { label: string; id: number }[];
	export let form: ActionData;
	let filteredRooms: [] = [];

	$: if (selectedDropdown2) {
		const selectedStructure = options2.find(
			(structure) => structure.id === Number(selectedDropdown2)
		);

		filteredRooms = options3
			.filter((room) => room.key_str === selectedStructure?.id)
			.map((room) => ({ label: room.label, id: room.id }));
	}

	const dispatch = createEventDispatcher();
	// let isLoading: boolean = false;
	// let selected: string = '';
	let formElement;
	let selectedDropdown1: string = '';
	let selectedDropdown2: string = '';
	let selectedDropdown3: string = '';

	const onDropDownChange = (event) => {
		selected = event.detail;
	};

	const handleConfirm = () => {
		dispatch('confirm', {
			selectedDropdown1,
			selectedDropdown2,
			selectedDropdown3
		});
		if (formElement) formElement.submit();
		showSeanceBilanModal = false;
	};

	let startTime = '06:00';
	let endTime = '07:00';
	let date: string = '';

	$: {
		let [hours, minutes] = startTime.split(':').map(Number);
		hours = (hours + 1) % 24; // Increment hours and handle overflow
		endTime = `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}`;
	}
</script>

<ModalContainer
	bind:show={showSeanceBilanModal}
	variant="seanceBilan"
	header="Créer une séance bilan"
	footer={{
		action: {
			label: 'Valider la séance bilan',
			onConfirm: handleConfirm
		},
		cancel: {
			label: 'Cancel'
		}
	}}
>
	<form
		method="post"
		use:enhance
		bind:this={formElement}
		action="?/seanceBilan"
	>
		<div class="flex flex-col gap-1 w-full">
			<div class="flex w-full">
				<Input
					type="date"
					label="Sélectionnez un jour"
					left
					name="date"
					bind:value={date}
				/>
			</div>
			<div class="flex justify-between">
				<Input
					type="time"
					label="Débute à"
					id="startTime"
					left={true}
					class="w-max"
					min="06:00"
					bind:value={startTime}
					name="startTime"
				/>
				<Input
					type="time"
					id="endTime"
					label="Finit à"
					left={true}
					class="w-full"
					bind:value={endTime}
					disabled
					name="endTime"
				/>
			</div>
			<div class="flex mt-2">
				<IconHourGlass />
				<Typography
					>La séance dure <span class="font-semibold">1 heure</span></Typography
				>
			</div>
			<div class="flex flex-col gap-y-6 mt-6">
				<InputDropdown
					label="Séance effectuée par"
					options={options.map((option) => ({
						label: `${option.firstname} ${option.name}`,
						value: option.id
					}))}
					bind:value={selectedDropdown1}
					name="coach_id"
				/>
				<InputDropdown
					label="Dans le centre"
					options={options2.map((structure) => ({
						label: structure.label,
						value: structure.id
					}))}
					bind:value={selectedDropdown2}
					name="structure_id"
				/>
				<InputDropdown
					label="Salle"
					options={filteredRooms.map((room) => ({
						label: room.label,
						value: room.id
					}))}
					bind:value={selectedDropdown3}
					name="room_id"
				/>
			</div>
			<div class="flex" />
		</div>
	</form>
</ModalContainer>
