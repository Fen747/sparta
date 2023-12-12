<!-- TODO: remove this component and "merge" -->

<script lang="ts">
	//import { fade } from 'svelte/transition';
	import Typography from '../Global/Typography.svelte';
	import clsx from 'clsx';
	import IconChevronDown from '../Icons/IconChevronDown.svelte';
	import ModalCancel from '../Modal/ModalReason.svelte';

	let isToggled: boolean = false;
	let showModal: boolean = false;

	function handleTextClick() {
		isToggled = !isToggled;
	}

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<div
	class={clsx(
		'border rounded-[2.5rem] border-solid border-gray-300 py-[6px] px-4 flex items-center',
		{
			'bg-bluelight-100 gap-2': isToggled
		}
	)}
>
	<button
		class="focus:outline-none flex items-center"
		on:click={handleTextClick}
	>
		<Typography color="gray-700" variant="xs" class="font-medium">
			{isToggled ? 'Non : absence' : 'Non'}
		</Typography>
	</button>
	<div class="border border-gray-300 self-stretch mx-2" />
	<button
		class="focus:outline-none w-4 h-4 flex items-center justify-center"
		on:click={toggleModal}
	>
		<IconChevronDown />
	</button>
</div>
