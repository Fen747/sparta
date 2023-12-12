/** @type {import('svelte/action').Action}  */
export function teleport(node: HTMLElement, selector: string) {
	const teleportContainer = document.querySelector<HTMLElement>(selector);

	teleportContainer?.appendChild(node);

	return {
		destroy() {
			node.remove();
		}
	};
}
