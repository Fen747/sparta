<script lang="ts">
	import Icon from './Icon.svelte';
	import type { ComponentProps } from 'svelte';

	interface $$Props extends ComponentProps<Icon> {}

	export let { stroke = '', fill = '' }: $$Props = {};
</script>

<Icon {...$$restProps}>
	<circle cx="4" cy="4" r="4" {stroke} {fill} />
</Icon>
