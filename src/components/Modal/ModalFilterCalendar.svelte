<script lang="ts">
	import InputDropdown from '../Input/InputDropdown.svelte';
	import { teleport } from '$lib/actions/teleport';
	import { fly } from 'svelte/transition';
	import { FilterCalendar, resetFilter } from '$lib/store/FilterCalendar';

	export let showModal;
	export let handleClose: () => void;
	export let coaches;
	export let clients: any[] = [];

	let coachOptions = coaches.map(
		(coach: { firstname: any; name: any; id: any }) => ({
			label: `${coach.firstname} ${coach.name}`,
			value: coach.id
		})
	);

	let selectedCoach = coachOptions[0].value;
	let selectedClient: any;
	let clientOptions: never[] = [];

	$: if (selectedCoach) {
		clientOptions = clients
			.filter(
				(client: { key_referent: any }) => client.key_referent === selectedCoach
			)
			.map((client: { firstname: any; name: any; id: any }) => ({
				label: `${client.firstname} ${client.name}`,
				value: client.id
			}));
	}

	const confirmSelection = () => {
		FilterCalendar.update((currentState) => ({
			...currentState,
			keyCoach: selectedCoach,
			keyClient: selectedClient || null
		}));
		handleClose();
	};
	function handleReset() {
		resetFilter();
		handleClose();
	}
</script>

<!-- Modal Container -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<div
	use:teleport={'body'}
	on:click|self={handleClose}
	in:fly={{ y: -1000, duration: 300 }}
	out:fly={{ y: -1000, duration: 300 }}
	class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
>
	<!-- Modal Content -->
	<div
		class="flex flex-col justify-end items-stretch bg-white rounded-xl shadow-lg border border-gray-100 p-4"
		on:click={(e) => e.stopPropagation()}
	>
		<div class="text-neutral-900 text-lg font-semibold">Filtrer</div>
		<div class="text-neutral-700 text-sm mt-10">
			Voir le planning d’un ou plusieurs coach(s)
		</div>

		<InputDropdown
			label="Séance effectuée par"
			options={coachOptions}
			bind:value={selectedCoach}
			name="key_coach"
		/>

		<div class="text-neutral-700 text-sm mt-4">
			Voir les séances d’un client
		</div>
		<InputDropdown
			label="Choisir un client"
			options={clientOptions}
			bind:value={selectedClient}
			name="key_client"
		/>
		<br />
		<button
			on:click={handleReset}
			class="text-neutral-700 text-sm font-semibold justify-center items-center border border-gray-300 bg-white px-5 py-2.5 rounded-lg shadow-sm grow"
		>
			Réinitialiser
		</button>
		<!-- Modal Buttons -->
		<div class="flex justify-between gap-2 mt-8">
			<button
				on:click={handleClose}
				class="text-neutral-700 text-sm font-semibold justify-center items-center border border-gray-300 bg-white px-5 py-2.5 rounded-lg shadow-sm grow"
			>
				Fermer
			</button>
			<button
				on:click={confirmSelection}
				class="text-neutral-700 text-sm font-semibold justify-center items-center border border-gray-200 bg-neutral-200 px-5 py-2.5 rounded-lg shadow-sm grow"
			>
				Confirmer
			</button>
		</div>
	</div>
</div>
