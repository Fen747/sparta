<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	interface $$Props extends SVGAttributes<SVGSVGElement> {
		width?: string;
		height?: string;
		viewBox?: string;
	}

	export let {
		width = '24',
		height = '24',
		viewBox = '0 0 24 24'
	}: $$Props = {};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{...$$restProps}
	{width}
	{height}
	{viewBox}
>
	<slot />
</svg>
