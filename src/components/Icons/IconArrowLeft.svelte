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
		d="M19 12H5M5 12L12 19M5 12L12 5"
		{fill}
	/>
</Icon>
