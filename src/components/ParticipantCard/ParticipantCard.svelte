<script lang="ts">
	import Typography from '~/components/Global/Typography.svelte';
	import type { ParticipantCardPrecenseInformation } from '~/lib/types';

	import IconChevronRight from '../Icons/IconChevronRight.svelte';
	import IconMessage from '../Icons/IconMessage.svelte';
	import IconPhone from '../Icons/IconPhone.svelte';
	import IconUser from '../Icons/IconUser.svelte';
	import IconUsers from '../Icons/IconUsers.svelte';
	import ModalReason from '../Modal/ModalReason.svelte';
	import ButtonGroupBase from '../ButtonGroupBase/ButtonGroupBase.svelte';

	type ParticipantCardVariant = 'coaching' | 'collective';

	interface $$PROPS {
		participants: number;
		variant: ParticipantCardVariant;
		presenceInformation?: ParticipantCardPrecenseInformation;
		hideCTAs?: boolean;
		clientName: string;
		phoneNumber?: string;
		clientId?: number;
	}

	export let participants: $$PROPS['participants'] = 1;
	export let presenceInformation: $$PROPS['presenceInformation'] = null;
	export let variant: $$PROPS['variant'];
	export let hideCTAs: $$PROPS['hideCTAs'] = false;
	export let clientName: $$PROPS['clientName'] = '';
	export let phoneNumber: $$PROPS['phoneNumber'] = '';
	export let clientId: $$PROPS['clientId'];

	const participantText = `${participants} participant${
		participants === 1 ? '' : 's'
	}`;
</script>

<div class="flex flex-col">
	{#if variant === 'collective'}
		<div class="flex items-center">
			<IconUsers />
			<Typography as="p" variant="sm" class="font-medium">
				{participantText}
			</Typography>
		</div>
	{:else}
		<div class="flex items-center">
			<IconUser />
			<Typography as="p" variant="sm" class="font-medium">
				{participantText}
			</Typography>
		</div>
		<div class="p-3 mt-2 bg-gray-50 rounded-[0.25rem]">
			<div class="flex items-center justify-between">
				<Typography as="p" color="gray-800" variant="sm" class="font-semibold">
					{clientName}
				</Typography>
				<div class="flex">
					<a href="tel:{phoneNumber}">
						<button
							class="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-lg"
						>
							<IconPhone />
						</button>
					</a>
					<a href="sms:{phoneNumber}">
						<button
							class="flex items-center justify-center ml-2 w-9 h-9 bg-gray-200 rounded-lg"
						>
							<IconMessage />
						</button>
					</a>
				</div>
			</div>
			<!-- Routing vers client details -->
			<a
				href="/clients/prospect-details/{clientId}"
				class="flex items-center mt-3 pt-3 border-t"
			>
				<Typography as="p" color="gray-500" variant="sm" class="font-semibold">
					Voir les informations sur ce client
				</Typography>
				<IconChevronRight fill={'#70706B'} />
			</a>
			{#if !hideCTAs}
				<div class="flex items-center border-t pt-3 mt-3">
					<Typography
						as="p"
						color="gray-600"
						variant="xs"
						class="mr-2 font-medium"
					>
						Présence :
					</Typography>
					<div class="mr-1">
						<ButtonGroupBase bind:presenceInformation text="Oui" />
					</div>
					<ButtonGroupBase
						bind:presenceInformation
						text="Non"
						modalComponent={ModalReason}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
