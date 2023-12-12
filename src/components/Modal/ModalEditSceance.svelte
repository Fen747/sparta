<script lang="ts">
	import IconCalendar from '../Icons/IconCalendar.svelte';
	import IconClockFastForward from '../Icons/IconClockFastForward.svelte';
	import IconHome from '../Icons/IconHome.svelte';
	import Input from '../Input/Input.svelte';
	import ModalContainer from './ModalContainer.svelte';
	import InputDropdown from '../Input/InputDropdown.svelte';
	import type { PageData } from './$types';
	import Typography from '../Global/Typography.svelte';

	export let show: boolean;
	export let data: PageData;

	let daysOptions = ['Lundi 25 septembre', 'Mardi 26 septembre'];
	let timeOptions = [
		'6:00',
		'7:00',
		'8:00',
		'9:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'11:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'19:00'
	];

	export let structures;
	export let coaches;
	let centerOptions =
		structures?.map((structure: { label: any }) => structure.label) || [];
	let coachOptions = coaches.map((coach) => `${coach.firstname} ${coach.name}`);

	// values du dropdowns
	let selectedDay = daysOptions[0];
	let selectedStartTime = timeOptions[0];
	let selectedEndTime = timeOptions[1];
	let selectedCoach = coachOptions[0];
	let selectedCenter = centerOptions[0];

	const handleSave = () => {
		submitForm();
		show = false;
	};

	const handleCancel = () => {
		show = false;
	};

	const submitForm = () => {};
</script>

<ModalContainer
	bind:show
	variant="reason"
	header="Modifier la séance"
	footer={{
		action: {
			label: 'Enregistrer les changements',
			onConfirm: handleSave
		},
		cancel: {
			label: 'Annuler la séance',
			onCancel: handleCancel
		}
	}}
>
	<div class="modal-content w-full h-full p-4">
		<form on:submit|preventDefault={submitForm}>
			<Input
				type="date"
				label="Sélectionnez un jour"
				bind:value={selectedDay}
			/>
			<div class="flex space-x-4">
				<InputDropdown
					label="Débute à"
					options={timeOptions}
					bind:selected={selectedStartTime}
				/>
				<InputDropdown
					label="Finit à"
					options={timeOptions}
					bind:selected={selectedEndTime}
				/>
			</div>
			<div class="my-4">
				<p>La séance dure 1 heure</p>
			</div>
			<InputDropdown
				label="Séance effectuée par"
				options={coachOptions}
				bind:selected={selectedCoach}
			/>
			<InputDropdown
				label="Dans le centre"
				options={centerOptions}
				bind:selected={selectedCenter}
			/>
			<div class="mt-6">
				<Input
					label="Mes séances ce jour-là et celles des autres coachs dans la même salle."
					disabled
				/>
			</div>
		</form>
	</div>
</ModalContainer>
