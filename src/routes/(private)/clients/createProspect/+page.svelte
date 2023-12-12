<script lang="ts">
	import Input from '~/components/Input/Input.svelte';
	import type { PageData, ActionData } from './$types';
	import InputDropdown from '~/components/Input/InputDropdown.svelte';
	import Button from '~/components/Button/Button.svelte';
	import Typography from '~/components/Global/Typography.svelte';
	import IconCheck from '~/components/Icons/IconCheck.svelte';
	import { enhance } from '$app/forms';
	import IconArrowLeft from '~/components/Icons/IconArrowLeft.svelte';

	export let data: PageData;
	export let form: ActionData;

	const provenanceOptions = data.qualifiers.clientSource.at_lbl.map(
		(label: string, index: number) => ({
			id: index,
			label: label
		})
	);

	let selectedStructID: number | null = null;
	let selectedCoachID: number | null = null;
	let selectedProvenanceID: number | null = null;
	let selectedAdderID: number | null = null;
</script>

<div class="bg-zinc-100">
	<div class="mt-4 mb-6 flex p-4">
		<a href="/clients">
			<IconArrowLeft stroke="black" stroke-width="2" />
		</a>
		<Typography variant="lg" class="font-bold"
			>Ajouter un nouveau prospect</Typography
		>
	</div>
	<div>
		<!-- //!TODO: Les inputs affichent les ID des objets apres le choix: a modifier -->
		<!-- //! TODO: Redirection apres la creation du prospect -->
		<form use:enhance method="post">
			<div class="flex flex-col gap-y-6 p-4 bg-white rounded-xl">
				<Input type="text" label="Nom" name="firstname" left={true} required />
				<Input type="text" label="Prénom" name="name" left={true} required />
				<Input type="text" label="Email" name="email" left={true} />
				<Input type="text" label="Téléphone" name="phone_mobile" left={true} />
				<InputDropdown
					label="Coach prospect"
					options={data.coaches.map((coach) => ({
						value: coach.id,
						label: `${coach.firstname} ${coach.name}`
					}))}
					on:change={(e) => (selectedAdderID = e.detail)}
					selected="Selectionnez un coach"
					bind:value={selectedAdderID}
					name="prospect_source"
				/>
				<InputDropdown
					on:change={(e) => (selectedProvenanceID = e.detail)}
					label="Origine du prospect"
					options={provenanceOptions.map((option) => ({
						value: option.id,
						label: option.label
					}))}
					selected="Selectionnez une provenance"
					bind:value={selectedProvenanceID}
					name="provenance"
				/>

				<InputDropdown
					on:change={(e) => (selectedStructID = e.detail)}
					label="Centre de rattachement"
					options={data.structures.map((struct) => ({
						value: struct.id,
						label: struct.label
					}))}
					selected="Selectionnez un centre de rattachement"
					bind:value={selectedStructID}
					name="key_str"
				/>
				<InputDropdown
					on:change={(e) => (selectedCoachID = e.detail)}
					label="Coach référent"
					options={data.coaches.map((coach) => ({
						value: coach.id,
						label: `${coach.firstname} ${coach.name}`
					}))}
					selected="Selectionnez un coach référent"
					bind:value={selectedCoachID}
					name="key_referent"
				/>

				<Button IconComponent={IconCheck} class="w-full" type="submit">
					<Typography variant="md" class="font-semibold p-1"
						>Enregistrer ce nouveau prospect</Typography
					>
				</Button>
				{#if form?.body.success}
					<div class="bg-green-100 text-green-700 text-center p-4">
						<Typography variant="md" class="font-semibold p-1"
							>Votre prospect a bien été enregistré</Typography
						>
					</div>
				{/if}
			</div>
		</form>
	</div>
</div>
