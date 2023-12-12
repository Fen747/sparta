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
		d="MM6 3V6L8 7M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
		{fill}
	/>
	<defs>
		<clipPath id="clip0_7378_4069">
			<rect width="12" height="12" fill="white" />
		</clipPath>
	</defs>
</Icon>
