<script lang="ts">
	import Typography from '../Global/Typography.svelte';
	import { format } from 'date-fns';
	import fr from 'date-fns/locale/fr';

	// TODO: get data from API
	export let coachName: string = 'Sarah';

	const date = format(new Date(), 'EEEE d MMMM', { locale: fr });
</script>

<div class="flex flex-col gap-1 items-stretch">
	<Typography as="h1" color="gray-900" variant="2xl" class="font-bold leading-5 w-full ">
		Bonjour {coachName}.
	</Typography>
	<Typography as="p" color="gray-600" variant="xs" class="mt-1">
		Aujourd'hui, nous sommes le <span
			class="capitalize text-gray-900 font-medium">{date}</span
		>.
	</Typography>
</div>
