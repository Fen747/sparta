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
		d="M2.25 9H12.75M2.25 4.5H15.75M2.25 13.5H15.75"
		{fill}
	/>
</Icon>
