<script lang="ts">
	import clsx from 'clsx';
	import { teleport } from '$lib/actions/teleport';
	import IconInfoCircle from './../Icons/IconInfoCircle.svelte';
	import Typography from './../Global/Typography.svelte';
	import Button from '../Button/Button.svelte';
	import type { ComponentProps } from 'svelte';
	import IconXCircle from '../Icons/IconXCircle.svelte';

	type FooterModal = {
		action: {
			label: string;
			onConfirm: () => void;
			variant?: ComponentProps<Button>['variant'];
		};
		cancel?: {
			label: string;
			variant?: ComponentProps<Button>['variant'];
		};
	};

	interface $$Props {
		variant: 'reason' | 'cancel' | 'stateEvolution' | 'seanceBilan';
		show?: boolean;
		header: string;
		footer: FooterModal;
		hideIcon?: boolean;
		closable?: boolean;
	}

	export let variant: $$Props['variant'];
	export let show: $$Props['show'] = false;
	export let header: $$Props['header'];
	export let footer: $$Props['footer'];
	export let hideIcon: $$Props['hideIcon'] = false;
	export let closable: $$Props['closable'] = false;

	const handleClose = () => (show = false);
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		use:teleport={'body'}
		on:click|self={handleClose}
		class="fixed inset-0 flex items-center justify-center z-40 bg-black/30"
	>
		<div
			class={clsx(
				'z-50 bg-white rounded-xl shadow-lg p-4',
				variant === 'seanceBilan' ? 'w-80' : null
			)}
		>
			<header class="flex flex-col gap-4">
				{#if !hideIcon}
					<div
						class={clsx(
							'rounded-full p-2 flex w-max',
							variant === 'cancel' ? 'bg-rose-50' : 'bg-bluelight-50'
						)}
					>
						<div
							class={clsx(
								'rounded-full p-2 flex',
								variant === 'cancel' ? 'bg-rose-100' : 'bg-bluelight-100'
							)}
						>
							<IconInfoCircle
								class={clsx(
									variant === 'cancel'
										? 'stroke-rose-600 fill-rose-600'
										: 'stroke-bluelight-600 fill-bluelight-600'
								)}
							/>
						</div>
					</div>
				{/if}

				<div class="flex w-full justify-between">
					<Typography as="h4" color="gray-900" class="font-semibold text-lg">
						{header}
					</Typography>
					{#if closable}
						<div on:click={handleClose}><IconXCircle /></div>
					{/if}
				</div>
			</header>

			<div class="mb-6 mt-4">
				<slot />
			</div>

			{#if footer}
				<footer class="flex flex-col gap-3">
					<Button
						variant={footer.action.variant || 'primary'}
						onClick={footer.action.onConfirm}
					>
						{footer.action.label}
					</Button>
					<Button
						variant={footer.cancel.variant || 'ghost'}
						onClick={handleClose}
					>
						{footer.cancel.label}
					</Button>
				</footer>
			{/if}
		</div>
	</div>
{/if}
