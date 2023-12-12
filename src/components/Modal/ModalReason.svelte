<script lang="ts">
	import type { ParticipantCardPrecenseInformation } from '~/lib/types';

	import ModalContainer from './ModalContainer.svelte';

	export let show: boolean;
	export let presenceInformation: ParticipantCardPrecenseInformation = null;

	let currentValue: string = '';

	const handleConfirm = () => {
		presenceInformation = currentValue
			? {
					presence: false,
					cancellationReason: currentValue
			  }
			: null;
		show = false;
	};
</script>

<ModalContainer
	bind:show
	variant="reason"
	header="Quelle est la raison de cette absence ?"
	footer={{
		action: {
			label: 'Confirm',
			onConfirm: handleConfirm
		},
		cancel: {
			label: 'Cancel'
		}
	}}
>
	<div class="flex flex-col gap-1">
		<label for="reason-modal">Raison :</label>
		<input bind:value={currentValue} name="reason-modal" type="text" />
	</div>
</ModalContainer>
