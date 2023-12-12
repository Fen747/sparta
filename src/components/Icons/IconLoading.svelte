<script lang="ts">
	import Icon from './Icon.svelte';
	import type { ComponentProps } from 'svelte';

	interface $$Props extends ComponentProps<Icon> {}

	export let fill: $$Props['fill'] = '';
</script>

<Icon {...$$restProps}>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M9 1.6875V3.5625M9 13.5V16.5M4.3125 9H1.6875M15.9375 9H14.8125M13.8428 13.8428L13.3125 13.3125M13.9982 4.06184L12.9375 5.1225M3.69118 14.3088L5.8125 12.1875M3.84651 3.90651L5.4375 5.4975"
		{fill}
	/>
</Icon>
