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
		d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
		{fill}
	/>
</Icon>
