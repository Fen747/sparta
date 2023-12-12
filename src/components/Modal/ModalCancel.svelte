<script lang="ts">
	import InputDropdown from '../Input/InputDropdown.svelte';
	import ModalContainer from './ModalContainer.svelte';

	export let show: boolean;

	let selectedRole: 'coach' | 'client' | null = null;

	// TODO: remove mockup
	let reasons = ['Piscine', 'Hiver Nucléaire', 'Oui.'];
	let selected: string;
</script>

<ModalContainer
	variant="cancel"
	header="Annuler la séance"
	bind:show
	footer={{
		action: {
			label: 'Confirm',
			onConfirm: () => {},
			variant: 'cancel' //variante du button
		},
		cancel: {
			label: 'Cancel',
			variant: 'ghost' //variante du button
		}
	}}
>
	<h2 class="text-center text-2xl font-bold mb-4">Annuler la séance</h2>
	<div class="mb-4">
		<span class="block mb-2 text-gray-600"
			>Qui souhaite annuler la séance ?</span
		>
		<div class="flex items-center space-x-4">
			<label class="flex items-center">
				<input
					type="radio"
					class="o h-5 w-5 checked:text-gray-600 cursor-pointer"
					bind:group={selectedRole}
					value="coach"
				/>
				<span class="ml-2">Le coach</span>
			</label>
			<label class="flex items-center">
				<input
					type="radio"
					class=" h-5 w-5 checked:bg-gray-600 cursor-pointer"
					bind:group={selectedRole}
					value="client"
				/>
				<span class="ml-2">Le client</span>
			</label>
		</div>

		{#if selectedRole}
			<InputDropdown
				label="Quelle est la raison de cette annulation ?"
				bind:options={reasons}
				bind:selected
			/>
		{/if}
	</div></ModalContainer
>
