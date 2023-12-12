<script lang="ts">
	import ProspectsCards from '~/components/ProspectsCards/ProspectsCards.svelte';
	import type { PageData } from './$types';
	import { APP_NAME } from '~/lib/consts';
	import Input from '~/components/Input/Input.svelte';
	import Button from '~/components/Button/Button.svelte';
	import IconPlus from '~/components/Icons/IconPlus.svelte';
	import Typography from '~/components/Global/Typography.svelte';
	import IconSearch from '~/components/Icons/IconSearch.svelte';

	export let data: PageData;

	// VARIABLE QUI GERE L'AFFICHAGE DE LA NAVBAR DE LA PAGE
	let section: string = 'prospects';

	let searchQuery: string = '';

	$: filteredProspects =
		searchQuery.length >= 3
			? data.states.filter(
					(prospect) =>
						prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						prospect.firstname.toLowerCase().includes(searchQuery.toLowerCase())
			  )
			: data.states;
</script>

<svelte:head>
	<title>{section === 'prospects' ? 'Prospects' : 'Clients'} - {APP_NAME}</title
	>
</svelte:head>

<div class=" bg-zinc-100 flex flex-col rounded-lg">
	<h2
		class="text-neutral-900 text-2xl font-bold leading-8 whitespace-nowrap ml-4 mt-8 self-start max-md:ml-2.5 mb-6"
	>
		Clients & prospects
	</h2>
</div>

<div class="bg-zinc-100">
	<div class="flex flex-col bg-white min-h-screen gap-y-6 rounded-3xl">
		<!-- Navigation bar -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div class="flex justify-between items-center px-4 pt-2 mt-6">
			<!-- Prospects Tab -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class=" w-full">
				<h2
					class={'text-center text-base leading-6 ' +
						(section === 'prospects'
							? 'text-zinc-800  font-semibold'
							: 'text-gray-700, font-normal') +
						' cursor-pointer'}
					on:click={() => (section = 'prospects')}
				>
					Prospects
					<div
						class={'transition-all duration-300 ease-in-out h-0.5 mt-2 rounded-lg ' +
							(section === 'prospects'
								? 'bg-neutral-700 w-full'
								: 'bg-transparent')}
					/>
				</h2>
			</div>
			<!-- Clients Tab -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class=" w-full">
				<h2
					class={'text-center text-base leading-6 ' +
						(section === 'clients'
							? 'text-zinc-800  font-semibold'
							: 'text-neutral-700, font-normal') +
						' cursor-pointer'}
					on:click={() => (section = 'clients')}
				>
					Clients
					<div
						class={'transition-all duration-300 ease-in-out h-0.5 mt-2 rounded-lg ' +
							(section === 'clients'
								? 'bg-neutral-700 w-full'
								: 'bg-transparent')}
					/>
				</h2>
			</div>
		</div>
		<div class="mx-3 flex flex-col gap-y-6 mb-35">
			{#if section === 'prospects'}
				<a href="./clients/createProspect">
					<Button IconComponent={IconPlus} class="w-full">
						<Typography variant="md" class="font-semibold p-1"
							>Ajouter un nouveau prospect</Typography
						>
					</Button>
				</a>
			{/if}
			<Input
				bind:value={searchQuery}
				placeholder="Rechercher un prospect..."
				IconComponent={IconSearch}
			/>
			<!--  <ProspectsCards> -->
			{#if section === 'prospects'}
				{#each filteredProspects as prospect}
					<a href="./clients/prospect-details/{prospect.id}">
						<ProspectsCards
							addedBy={prospect.prospect_source}
							referentCoach={prospect.key_referent}
							firstName={prospect.firstname}
							lastName={prospect.name}
							bilanCompleted={prospect.state}
						/>
					</a>
				{/each}
			{/if}
			{#if section === 'clients'}
				{#each data.signedClients as client}
					<a href="./clients/prospect-details/{client.id}">
						<div class="py-3 px-4 shadow-custom rounded-xl">
							<Typography variant="lg" class="font-semibold">
								{client.firstname}
								{client.name}
							</Typography>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>
