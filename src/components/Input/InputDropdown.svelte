<script context="module" lang="ts">
	export interface Options {
		value: string | number;
		label: string;
	}
</script>

<script lang="ts">
	import clsx from 'clsx';
	import IconOneUser from './../Icons/IconOneUser.svelte';
	import IconChevronDown from '../Icons/IconChevronDown.svelte';
	import { createEventDispatcher } from 'svelte';

	interface $$Props {
		label?: string;
		options: Options[];
		value?: string | number;
		icon?: boolean;
		disabled?: boolean;
		IconComponent?: typeof IconOneUser;
		name?: string;
	}

	export let label: $$Props['label'] = '';
	export let options: $$Props['options'] = [];
	export let value: $$Props['value'] = '';
	export let icon: $$Props['icon'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let IconComponent: $$Props['IconComponent'] = IconOneUser;
	export let name: $$Props['name'] = '';
	let selectedLabel = '-';
	let isOpen = false;

	const dispatch = createEventDispatcher();

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const selectOption = (option: string) => {
		value = option;
		isOpen = false;
		dispatch('change', value);
	};

	$: selectedLabel =
		options.find((option) => option.value === value)?.label || '-';
	$: buttonClasses = clsx(
		'inline-flex items-center w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm font-medium text-gray-700',
		{
			'hover:bg-gray-100': !disabled,
			'focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50':
				!disabled
		}
	);
</script>

<div class="relative inline-block text-left w-full">
	{#if name}
		<input type="hidden" {name} bind:value />
	{/if}
	<span class="block text-sm font-medium text-gray-700 mb-1">{label}</span>
	<div class="relative">
		<button
			type="button"
			class={buttonClasses}
			{disabled}
			on:click={toggleDropdown}
		>
			<div class="inline-flex items-center">
				{#if icon}
					<svelte:component this={IconComponent} class="mr-4" />
				{/if}
				{selectedLabel}
			</div>
			<IconChevronDown
				class="transition ease-in-out duration-200 ml-auto {isOpen
					? 'rotate-180'
					: ''}"
			/>
		</button>

		{#if isOpen}
			<div
				class="absolute left-0 mt-1 w-full max-h-32 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100"
			>
				<div class="py-1">
					{#each options as option, index (index)}
						<button
							class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
							on:click={() => selectOption(option.value)}
						>
							{option.label}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
