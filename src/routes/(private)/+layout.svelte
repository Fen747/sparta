<script lang="ts">
	import Navbar from '~/components/Navbar/Navbar.svelte';
	import IconHome from '~/components/Icons/IconHome.svelte';
	import IconCalendar from '~/components/Icons/IconCalendar.svelte';
	import IconUsers from '~/components/Icons/IconUsers.svelte';
	import { ROUTES } from '~/lib/consts';

	const items = [
		{
			text: 'Home',
			to: '/dashboard',
			IconComponent: IconHome
		},
		{
			text: 'Agenda',
			to: '/agenda',
			IconComponent: IconCalendar
		},
		{
			text: 'Clients',
			to: '/clients',
			IconComponent: IconUsers
		}
	];
</script>

<main >
	<slot />
</main>

<Navbar className="fixed bottom-0 left-0 right-0" {items} />
