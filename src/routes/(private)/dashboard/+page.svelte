<script lang="ts">
	import { ROUTES, APP_NAME } from '~/lib/consts';
	import type { PageData } from './$types';
	import Typography from '~/components/Global/Typography.svelte';
	import Welcome from '~/components/Welcome/Welcome.svelte';
	import Button from '~/components/Button/Button.svelte';
	import IconCalendar from '~/components/Icons/IconCalendar.svelte';
	import IconOneUser from '~/components/Icons/IconOneUser.svelte';
	import IconPlus from '~/components/Icons/IconPlus.svelte';
	import SeancesCards from '~/components/SeancesCards.svelte';
	import ProspectsCards from '~/components/ProspectsCards/ProspectsCards.svelte';
	import { secondsToTime } from '~/lib/utils';
	import LogOut from '~/components/Icons/LogOut.svelte';

	export let data: PageData;
	$: events = data.events.map((event) => {
		const discipline =
			data.disciplines.find((d) => d.id === event.key_disc) || {};
		const room = data.rooms.find((r) => r.id === event.key_room) || {};
		const product = data.products.find((p) => p.id === event.key_product) || {};
		const structure =
			data.structures.find((s) => s.id === event.clientInfo.key_str) || {};
		const time = secondsToTime(event.time);

		return { ...event, discipline, room, product, structure, data: event.data };
	});
</script>

<svelte:head>
	<title>Acceuil - {APP_NAME}</title>
	<meta name="Acceuil" />
</svelte:head>

<div class="mx-3 pt-4">
	<section class="bg-white shadow rounded-lg p-4 mt-6">
		<header class="flex justify-between items-center p-4">
			<Welcome coachName={data.coachName} />
			<form action={`${ROUTES.api.logout}`} method="POST" class="ml-auto">
				<button
					class=" ml-2 flex items-center justify-center p-4 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
				>
					<LogOut class=" w-6 h-6" />
				</button>
			</form>
		</header>
		<br />
		<Typography as="p" class="flex font-semibold items-center pb-2 ">
			<IconCalendar class="mr-2" />
			Mes séances du jour
		</Typography>

		{#if events.length > 0}
			{#each events as event}
				<div class="my-2">
					<SeancesCards
						props={{
							firstname: event.clientInfo.firstname,
							name: event.clientInfo.name,
							coachName: event.coachName,
							subject: event.subject,
							status: event.state,
							address: event.structure.label,
							isSessionStep: event.count,
							panelManager: false,
							hourBegin: secondsToTime(event.time),
							hourEnd: secondsToTime(event.time + event.duration),
							date: event.date,
							sessionType: event.discipline.label,
							count: event.clientsEvents[0].count,
							total: event.product.count_events,
							showText: true,

							recapitulatif: event.recapitulatif // Optional
						}}
						clickable={true}
						slug={event.key_client}
					/>
				</div>
			{/each}
		{:else}
			<Typography as="p" class="flex items-center pb-2 text-gray-500">
				Pas de séance aujourd’hui ! Reposez-vous 😴
			</Typography>
		{/if}

		<Button
			variant="primary"
			class="w-full mt-6 font-semibold"
			IconComponent={IconCalendar}
		>
			Voir tout l'agenda
		</Button>
	</section>
	<section class="bg-white shadow rounded-lg p-4 mt-6">
		<Typography as="p" class="flex font-semibold items-center ">
			<IconOneUser class="mr-2" />
			Mes Prospects
		</Typography>
		<div class="flex space-x-4 overflow-x-auto py-2 mt-6">
			{#each data.states as prospect}
				<a href="/clients/prospect-details/{prospect.id}">
					<ProspectsCards
						addedBy={prospect.prospect_source}
						referentCoach={prospect.key_referent}
						firstName={prospect.firstname}
						lastName={prospect.name}
						bilanCompleted={prospect.state}
						dashboard={true}
					/>
				</a>
			{/each}
		</div>
		<a href="../clients/createProspect">
			<Button
				variant="primary"
				class="w-full mt-6 font-semibold"
				IconComponent={IconPlus}
			>
				Ajouter un nouveau prospect
			</Button>
		</a>
	</section>
	<br />

	<!-- <form action={`${ROUTES.api.logout}`} method="POST" class="max-w-sm mx-auto">
		<Button class="w-50" variant="cancel">Adios</Button>
	</form> -->
</div>
