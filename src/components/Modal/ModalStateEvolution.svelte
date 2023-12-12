<script lang="ts">
	import InputDropdown from '../Input/InputDropdown.svelte';
	import ModalContainer from './ModalContainer.svelte';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/$types';

	export let showStateModal: boolean;
	export let options: string[];
	export let form: ActionData;
	export let showSeanceBilanModal;

	const dispatch = createEventDispatcher();

	let selected: number;
	let formElement;

	const onDropDownChange = (event) => {
		selected = event.detail;
		if (selected === 3) {
			showSeanceBilanModal = true;
			showStateModal = false;
		}
	};
	const handleConfirm = () => {
		dispatch('confirm', { selected });
		if (formElement) formElement.submit();
		showStateModal = false;
	};
</script>

<ModalContainer
	bind:show={showStateModal}
	variant="stateEvolution"
	header="Évolution de l’état du prospect"
	footer={{
		action: {
			label: 'Enregistrer le statut',
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
		action="?/stateUpdate"
	>
		<div class="flex flex-col gap-1">
			<label for="reason-modal">Quel est le résultat de l’appel ?</label>
			<InputDropdown
				options={options.map((option) => ({
					label: option.label,
					value: option.value
				}))}
				bind:value={selected}
				on:change={onDropDownChange}
				name="newState"
			/>
			<!-- <input type="hidden" name="selectedOption" value={selected} /> -->
		</div>
	</form>
</ModalContainer>
