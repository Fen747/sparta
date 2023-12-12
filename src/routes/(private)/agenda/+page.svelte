<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar, melt } from '@melt-ui/svelte';
	import { APP_NAME } from '~/lib/consts';
	import type { PageData } from './$types';
	import SeancesCards from '~/components/SeancesCards.svelte';
	import { secondsToTime } from '~/lib/utils';
	import ModalFilterCalendar from '~/components/Modal/ModalFilterCalendar.svelte';
	import { FilterCalendar } from '$lib/store/FilterCalendar';

	export let data: PageData;
	let keyCoach;
	let keyClient;

	const isToday = (day, month, year) => {
		const today = new Date();
		return (
			day === today.getDate() &&
			month === today.getMonth() + 1 &&
			year === today.getFullYear()
		);
	};

	// console.buche = function () {
	// 	console.log.apply(console, arguments);
	// };

	onMount(() => {
		initializeOrReset();
		FilterCalendar.subscribe(($FilterCalendar) => {
			keyCoach = $FilterCalendar.keyCoach;
			keyClient = $FilterCalendar.keyClient;
			if (keyCoach === null) {
				initializeOrReset();
			} else {
				if (keyClient) {
					console.log('keyClient updated:', keyClient); // log keyClient if
				}
				onDayClick(new Date().toISOString().split('T')[0]);
			}
		});
	});

	const initializeOrReset = () => {
		const today = new Date().toISOString().split('T')[0];
		keyCoach = data.user?.data?.coach_id;
		FilterCalendar.set({ keyCoach: keyCoach });
		if (typeof window !== 'undefined') {
			onDayClick(today);
		}
	};

	let coaches = data.coaches;
	const {
		elements: { calendar, heading, cell, prevButton, nextButton },
		states: { months, headingValue, daysOfWeek },
		helpers: { isDateDisabled, isDateUnavailable }
	} = createCalendar({ locale: 'fr-FR' });

	interface HourSlot {
		label: string;
		events: any[];
	}

	let selectedDate = null;

	let showModal = false;
	let slots: HourSlot[] = [
		{ label: '08:00', events: [] },
		{ label: '09:00', events: [] },
		{ label: '10:00', events: [] },
		{ label: '11:00', events: [] },
		{ label: '12:00', events: [] },
		{ label: '13:00', events: [] },
		{ label: '14:00', events: [] },
		{ label: '15:00', events: [] },
		{ label: '16:00', events: [] },
		{ label: '17:00', events: [] },
		{ label: '18:00', events: [] },
		{ label: '19:00', events: [] },
		{ label: '20:00', events: [] },
		{ label: '21:00', events: [] }
	];

	async function fetchEventsForDate(
		date,
		keyCoachParam,
		keyClientParam = null
	) {
		// Build the URL for my +server.ts endpoint
		let url = `/api/${date}?keyCoach=${keyCoachParam}`;
		if (keyClientParam) {
			url += `&keyClient=${keyClientParam}`;
		}

		const response = await fetch(url);
		if (response.ok) {
			const eventData = await response.json();
			return eventData.events;
		} else {
			console.error('Error fetching events');
			return [];
		}
	}

	async function onDayClick(date) {
		// Format the date properly
		const formattedDate =
			date instanceof Date ? date.toISOString().split('T')[0] : date;
		selectedDate = formattedDate;

		// Fetch events for the given date and keyCoach
		const newEvents = await fetchEventsForDate(formattedDate, keyCoach);

		// Reset events for each slot
		slots = slots.map((slot) => ({ ...slot, events: [] }));

		// Process each fetched event
		newEvents.forEach((event) => {
			const eventHour = secondsToTime(event.time);

			const slotIndex = slots.findIndex((slot) => slot.label === eventHour);
			if (slotIndex !== -1) {
				const detailedEvent = {
					...event,
					discipline:
						data.disciplines.find((d) => d.id === event.key_disc) || {},
					room: data.rooms.find((r) => r.id === event.key_room) || {},
					product: data.products.find((p) => p.id === event.key_product) || {},
					structure: data.structures.find((s) => s.id === event.key_str) || {},
					hourBegin: eventHour,
					hourEnd: secondsToTime(event.time + event.duration)
				};
				slots[slotIndex].events.push(detailedEvent);
			} else {
				console.error(`No slot found for event hour: ${eventHour}`);
			}
			slots = [...slots];
		});
	}

	const toggleModal = () => {
		showModal = !showModal;
	};
</script>

<svelte:head>
	<title>Agenda - {APP_NAME}</title>
</svelte:head>

<div class="flex flex-col" use:melt={$calendar}>
	<header class="relative p-2 bg-grey-100 rounded-lg shadow-md">
		<h1
			class="text-lg font-bold text-gray-700 text-center first-letter:uppercase"
			use:melt={$heading}
		>
			{$headingValue}
		</h1>
		<button
			class="absolute top-2 right-2 cursor-pointer text-xl"
			on:click={toggleModal}
		>
			🤷‍♂️
		</button>
	</header>
	{#each $months as month}
		<div class="overflow-x-auto text-center rounded-lg shadow-md">
			<table class="min-w-full divide-y divide-gray-300 mt-2">
				<thead class="bg-slate-100">
					<tr>
						{#each $daysOfWeek as day}
							<th
								scope="col"
								class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{day}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each month.weeks as weekDates}
						<tr>
							{#each weekDates as date}
								<td
									class={`px-3 py-2 whitespace-nowrap text-xs ${
										$isDateDisabled(date) || $isDateUnavailable(date)
											? 'opacity-50'
											: 'hover:bg-grey-100 cursor-pointer transition duration-300 ease-in-out'
									}`}
									role="gridcell"
									on:click={() => onDayClick(date)}
								>
									<div use:melt={$cell(date, month.value)}>
										{date.day}
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/each}
	<div class="flex justify-center mt-4">
		<button
			class="px-4 py-2 border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 rounded shadow-sm transition duration-300 ease-in-out mx-2"
			use:melt={$prevButton}
		>
			Précédent
		</button>
		<button
			class="px-4 py-2 border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 rounded shadow-sm transition duration-300 ease-in-out mx-2"
			use:melt={$nextButton}
		>
			Suivant
		</button>
	</div>
</div>
<br />

{#each slots as slot}
	<div class="h-[120px] grid grid-cols-[10%_90%]">
		<div class="border-r-2 border-solid border-gray-200 text-xs leading-5">
			{slot.label}
		</div>
		<div class="cards">
			{#each slot.events as event}
				<SeancesCards
					clickable={false}
					props={{
						firstname: event.clientInfo.firstname,
						name: event.clientInfo.name,
						coachName: event.coachName,
						subject: event.subject,
						status: event.clientsEvents[0].attendance,
						place: event.place,
						address: event.structure.label,
						isSessionStep: event.clientsEvents,
						panelManager: false,
						hourBegin: event.hourBegin,
						hourEnd: event.hourEnd,
						date: event.date,
						sessionType: event.discipline.label,
						// recapitulatif: event.recapitulatif
						count: event.clientsEvents[0].count,
						total: event.product.count_events,
						showText: true
					}}
				/>
			{/each}
		</div>
	</div>
{/each}

{#if showModal}
	<ModalFilterCalendar
		{showModal}
		{coaches}
		clients={data.clients}
		handleClose={toggleModal}
	/>
{/if}
