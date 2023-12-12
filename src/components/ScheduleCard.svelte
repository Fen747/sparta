<script lang="ts">
	import { format } from 'date-fns';
	import { fr } from 'date-fns/locale';

	import IconCalendar from '~/components/Icons/IconCalendar.svelte';
	import Tag from '~/components/Tag/Tag.svelte';
	import type { TagStatus } from '~/lib/types';
	import { secondsToTime } from '~/lib/utils';

	import Typography from './Global/Typography.svelte';
	import SessionSteps from './SessionSteps.svelte';
	import IconClock from './Icons/iconClock.svelte';
	import IconSearch from './Icons/IconSearch.svelte';

	interface $$Props {
		date: string;
		time: number;
		duration: number;
		sessionStatus: TagStatus;
		sessionTotal: number;
		sessionCurrent: number;
		coach: string;
		seanceBilan?: boolean;
	}

	export let date: $$Props['date'];
	export let time: $$Props['time'];
	export let duration: $$Props['duration'];
	export let sessionStatus: $$Props['sessionStatus'];
	export let sessionTotal: $$Props['sessionTotal'];
	export let sessionCurrent: $$Props['sessionCurrent'];
	export let coach: $$Props['coach'];
	export let seanceBilan: $$Props['seanceBilan'] = false;

	const formatedDate = format(new Date(date), 'EEEE d MMMM', { locale: fr });
	const startTime = secondsToTime(time);
	const endTime = secondsToTime(time + duration);
</script>

<div class="flex flex-col gap-2 shadow-custom border rounded-xl p-3">
	<div class="flex gap-2 items-center">
		<div class="flex flex-col w-full">
			<div class="flex w-full justify-between">
				<div class="flex">
					<IconCalendar class="w-4.5 h-4.5 mr-2" />
					<Typography
						as="span"
						class="font-semibold capitalize"
						color="gray-900"
						variant="sm"
					>
						{formatedDate}
					</Typography>
				</div>
				<div class="bg-gray-200 p-1 rounded-lg">
					<IconSearch />
				</div>
			</div>
			<div class="flex">
				<IconClock
					stroke="black"
					stroke-width="1.2"
					stroke-linejoin="round"
					stroke-linecap="round"
					class="mr-2"
				/>
				<Typography class="font-semibold" color="gray-900" variant="sm">
					{startTime} - {endTime}
				</Typography>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-2 p-3 gap-3 rounded-[0.25rem]">
		<div>
			{#if seanceBilan === false}
				<SessionSteps showText count={sessionCurrent} total={sessionTotal} />
			{/if}
			<Typography class="font-semibold" color="gray-600" variant="sm"
				>Coach: {coach}</Typography
			>
		</div>
		<div class="flex items-end justify-end">
			<Tag icon status={sessionStatus} />
		</div>
	</div>
</div>
