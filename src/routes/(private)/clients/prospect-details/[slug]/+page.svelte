<script lang="ts">
	import Typography from '~/components/Global/Typography.svelte';
	import Button from '~/components/Button/Button.svelte';
	import IconPhone from '~/components/Icons/IconPhone.svelte';
	import IconMessage from '~/components/Icons/IconMessage.svelte';
	import IconArrowLeft from '~/components/Icons/IconArrowLeft.svelte';
	import IconPlus from '~/components/Icons/IconPlus.svelte';
	import IconUserCircle from '~/components/Icons/IconUserCircle.svelte';
	import Tag from '~/components/Tag/Tag.svelte';
	import ModalStateEvolution from '~/components/Modal/ModalStateEvolution.svelte';
	import Input from '~/components/Input/Input.svelte';
	import InputDropdown from '~/components/Input/InputDropdown.svelte';
	import IconCheck from '~/components/Icons/IconCheck.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import TextArea from '~/components/Input/TextArea.svelte';
	import IconClockFastForward from '~/components/Icons/IconClockFastForward.svelte';
	import IconCircle from '~/components/Icons/IconCircle.svelte';
	import ModalSeanceBilan from '~/components/Modal/ModalSeanceBilan.svelte';
	import ScheduleCard from '~/components/ScheduleCard.svelte';
	import { page } from '$app/stores';
	import type {
		Clients,
		ClientsPrestas,
		ClientsProspects,
		Coaches,
		Disciplines,
		Events,
		Products,
		Qualifiers,
		Rooms,
		Structures
	} from '~/lib/api-sdk/types';

	const clientId = $page.params.slug;

	//! TODO: FIX THE ROOM SELECTION DROPDOWNINPUT FROM THE BILANSEANCE MODAL

	let show: boolean = false;
	let selectedValue: string = '';
	let selectedDropdown1: string | null = null;
	let selectedDropdown2: String | null = null;
	let selectedDropdown3: {} | null = null;
	let showStateModal: boolean = false;
	let showSeanceBilanModal: boolean = false;
	export let form: ActionData;

	interface DataType {
		clients: ClientsPrestas[];
		client: Clients;
		coaches: Coaches[];
		coach: Coaches[];
		products: Products[];
		prestas: ClientsPrestas[];
		structures: Structures[];
		qualifiers: Qualifiers;
		bilanDetails: Events[];
		prospectEvents: ClientsProspects[];
		states: Clients[];
		disciplines: Disciplines[];
		rooms: Rooms[];
		signedClients: Clients[];
	}
	export let data: DataType;
	const clientData: Clients | undefined =
		data.states.find((item) => item.id === Number(clientId)) ||
		data.signedClients.find((item) => item.id === Number(clientId));

	const coachBilan = data.coaches.find(
		(coach) => coach.id === data.bilanDetails.key_coach
	);

	const getClientProduct = () => {
		let clientProduct: Products[] = [];
		if (data.prestas.length > 0) {
			for (const prestas of data.prestas) {
				const foundProduct = data.products.find(
					(product) => product.id === prestas.key_product
				);
				const disciplineValue = data.disciplines.find(
					(discipline) => discipline.id === foundProduct?.key_disc
				);
				if (foundProduct) {
					clientProduct.push({
						...foundProduct,
						disciplineLabel: disciplineValue?.label,
						idPresta: prestas.id
					});
				}
			}
		} else {
			clientProduct = [];
		}
		return clientProduct;
	};

	const clientPrestas = getClientProduct();

	const handleBilanConfirm = (event: Event) => {
		selectedDropdown1 = (event as any).detail.selectedDropdown1;
		selectedDropdown2 = (event as any).detail.selectedDropdown2;
		selectedDropdown3 = (event as any).detail.selectedDropdown3;
	};
	const structures = data.structures;
	const [client] = data.client;

	const prospectStates = data.qualifiers.prospectState.at_lbl;

	// SI STATE === 3 ALORS UN BILAN A DEJA ETE PLANNIFIE
	const isBilanScheduled2 = data.prospectEvents.some(
		(event: Event) => (event as any).state === 3
	);

	const updatedProspectEvents = data.prospectEvents.map((event: Event) => {
		const stateLabel = prospectStates[(event as any).state];

		return {
			...event,
			state: stateLabel
		};
	});

	// REMPLACEMENT DE LA VALEUR SAISIE DANS LA MODIFICATION DU CENTRE DE RATTACHEMENT PAR SON ID
	let updatedStructureId = client.key_str;

	//REMPLACEMENT DE LA VALEURS SAISIE DANS LA MODIFICATION DU COACH REFERENT PAR SON ID
	let updatedReferentCoach = client.key_referent;
	function handleCoachChange(event: Event) {
		const selectedLabel = (event as any).detail;
		const coachSelected = data.coaches.find(
			(coach: Coaches) => coach.id === selectedLabel
		);
		updatedReferentCoach = coachSelected ? coachSelected.id : null;
	}

	let section = client.state === 'Prospect' ? 'Etat' : 'clientsInfos';
</script>

<div class="bg-gray-50 flex flex-col gap-y-6">
	<div class="flex flex-col py-4 px-4">
		<div class="w-full flex relative">
			<a href="../" class="absolute left-2">
				<IconArrowLeft stroke="black" stroke-width="2" />
			</a>
			<Typography variant="lg" class="mx-auto font-semibold"
				>{client.firstname} {client.name}</Typography
			>
		</div>
		<div class="flex mt-6 justify-evenly">
			<a href={`tel:${client.phone_mobile}`} class="w-full mx-1">
				<Button
					class=" py-3 w-full"
					IconComponent={IconPhone}
					disabled={client.phone_mobile === ''}
				>
					<Typography class="font-semibold">Appeler</Typography>
				</Button>
			</a>
			<a href={`sms:${client.phone_mobile}`} class="w-full mx-1">
				<Button
					class="py-3 w-full"
					IconComponent={IconMessage}
					variant="secondary"
					disabled={client.phone_mobile === ''}
				>
					<Typography class="font-semibold">Message</Typography>
				</Button>
			</a>
		</div>
	</div>
	<div class="rounded-3xl bg-white h-screen">
		<div class="flex justify-between items-center px-4 pt-2 mt-6">
			<!-- Prospects Tab -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class=" w-full">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<h2
					class={'text-center text-base leading-6 ' +
						(section === 'Etat' || section === 'clientsInfos'
							? 'text-zinc-800 font-semibold'
							: 'text-gray-700, font-normal') +
						' cursor-pointer'}
					on:click={() =>
						client.state === 'Prospect'
							? (section = 'Etat')
							: (section = 'clientsInfos')}
				>
					{client.state === 'Prospect' ? 'État' : 'Informations'}
					<div
						class={'transition-all duration-300 ease-in-out h-0.5 mt-2 rounded-lg ' +
							(section === 'Etat' || section === 'clientsInfos'
								? 'bg-neutral-700 w-full'
								: 'bg-transparent')}
					/>
				</h2>
			</div>
			<!-- Clients Tab -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class=" w-full">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<h2
					class={'text-center text-base leading-6 ' +
						(section === 'Informations'
							? 'text-zinc-800 font-semibold'
							: 'text-neutral-700, font-normal') +
						' cursor-pointer'}
					on:click={() =>
						(section =
							client.state === 'Prospect' ? 'Informations' : 'Prestations')}
				>
					{client.state === 'Prospect' ? 'Informations' : 'Prestations'}
					<div
						class={'transition-all duration-300 ease-in-out h-0.5 mt-2 rounded-lg ' +
							(section === 'Informations' || section === 'Prestations'
								? 'bg-neutral-700 w-full'
								: 'bg-transparent')}
					/>
				</h2>
			</div>
		</div>
		{#if section === 'Etat'}
			<div class="mt-6 px-4 flex flex-col gap-y-2">
				<div class="flex">
					<IconPlus stroke="lightgray" />
					<Typography variant="sm" color="gray-600" class="ml-2 font-medium"
						>Ajouté par : {clientData.prospect_source}</Typography
					>
				</div>
				<div class="flex">
					<IconUserCircle stroke="lightgray" />
					<Typography variant="sm" color="gray-600" class="ml-2 font-medium"
						>Coach référent : {clientData.key_referent}
					</Typography>
				</div>
			</div>
			<div class="mt-6 mx-4">
				<Tag status={clientData.state === false ? 'aFixer' : 'fixee'} />
			</div>
			<div class="flex flex-col mx-4 mt-6 border-b-2 border-gray-200">
				<div class="bg-gray-50 grid grid-cols-2 border-b-2 border-gray-200">
					<div class="px-2 py-3 w-16">
						<Typography variant="xs" color="gray-500" class="font-medium"
							>Date</Typography
						>
					</div>
					<div class="px-2 py-3">
						<Typography variant="xs" color="gray-500" class="font-medium">
							Compte-rendu appel
						</Typography>
					</div>
				</div>
				{#if updatedProspectEvents.length > 0}
					{#each updatedProspectEvents as clientEvent}
						<div class="border-b py-4 grid grid-cols-2">
							<div>
								<Typography color="gray-500" variant="xs">
									{clientEvent.date_recall}
								</Typography>
							</div>
							<div>
								<Typography color="gray-700" variant="xs" class="font-semibold">
									{clientEvent.state}
								</Typography>
							</div>
						</div>
					{/each}
				{:else}
					<Typography variant="xs" color="gray-700" class="p-2 font-medium">
						Vous n’avez pas encore recontacté votre prospect. Appelez-le pour
						fixer un bilan initial.
					</Typography>
				{/if}
			</div>
			{#if isBilanScheduled2 === true && data.bilanDetails.length !== 0}
				<div class="mx-4 mt-4">
					<ScheduleCard
						date={data.bilanDetails.date}
						time={data.bilanDetails.time}
						duration={data.bilanDetails.duration}
						sessionStatus="coming"
						sessionTotal={1}
						sessionCurrent={1}
						coach={`${coachBilan?.firstname} ${coachBilan?.name}`}
						seanceBilan={true}
					/>
				</div>
			{/if}
			<div class="mx-4 mt-6 flex justify-center">
				<Button
					variant="secondary"
					IconComponent={IconPlus}
					onClick={() => (showStateModal = true)}
				>
					<Typography class="font-semibold"
						>Renseigner une évolution d’état</Typography
					>
				</Button>
			</div>
			<ModalStateEvolution
				{show}
				options={data.stateOptions}
				on:confirm={(e) => (selectedValue = event.detail.selected)}
				bind:showStateModal
				bind:showSeanceBilanModal
			/>
			<div />
		{/if}
		{#if section === 'Informations' || section === 'clientsInfos'}
			<form method="post" use:enhance action="?/updateDetails">
				<div class="px-4 flex flex-col gap-y-6 mt-8">
					<TextArea
						label="Informations générales"
						value={client.infos}
						name="infos"
					/>
					<Input
						label="E-mail"
						left={true}
						value={clientData?.email}
						name="email"
					/>
					<Input
						label="N° de téléphone"
						left={true}
						value={clientData?.phone_mobile}
						name="phone_mobile"
					/>
					<Input
						label="Origine du prospect"
						left={true}
						value={clientData?.prospect_source}
						name="prospect_source"
						disabled
					/>
					<InputDropdown
						label="Centre de rattachement"
						options={structures?.length
							? structures.map((structure) => ({
									label: structure.label,
									value: structure.id
							  }))
							: []}
						selected={structures?.find(
							(structure) =>
								clientData?.key_str && structure.id === clientData.key_str
						)?.label || 'Non renseigné'}
						on:change={(e) => (updatedStructureId = e.detail)}
						bind:value={updatedStructureId}
						name="key_str"
					/>
					<Input
						label="Coach prospect"
						left={true}
						value={clientData?.prospect_source}
						name="prospect_source"
						disabled
					/>
					<InputDropdown
						label="Coach référent"
						options={data?.coaches?.map((coach) => ({
							label: coach.firstname + ' ' + coach.name,
							value: coach.id
						}))}
						selected={data.coaches.find(
							(coach) => coach.id === client.key_referent
						)?.name}
						on:change={(e) => (updatedReferentCoach = e.detail)}
						name="key_referent"
						bind:value={updatedReferentCoach}
					/>
					<Button IconComponent={IconCheck} class="w-full" type="submit">
						<Typography variant="md" class="font-semibold p-1"
							>Enregistrer les changements</Typography
						>
					</Button>
					{#if form?.body.success}
						<div class="bg-green-100 text-green-700 text-center p-4">
							<Typography variant="md" class="font-semibold p-1"
								>Modifications enregistré</Typography
							>
						</div>
					{/if}
				</div>
			</form>
		{/if}
		{#if section === 'Prestations'}
			{#if data.prestas.length !== null}
				{#each clientPrestas as presta}
					<a href="/clients/prospect-details/{clientId}/{presta.idPresta}">
						<div
							class="mt-8 mx-4 shadow-custom px-3 py-4 flex flex-col gap-y-2"
						>
							<Typography class="font-semibold"
								>{presta.disciplineLabel}</Typography
							>
							<div class="flex">
								<IconClockFastForward />
								<Typography
									variant="sm"
									color="gray-600"
									class="ml-2 font-medium"
									>{presta?.label}
								</Typography>
							</div>
							<div class="flex">
								<IconCircle />
								<Typography
									variant="sm"
									color="gray-600"
									class="ml-2 font-medium"
									>Séance
								</Typography>
							</div>
						</div>
					</a>
				{/each}
			{:else}
				<Typography>
					Ce client n’a pas encore de prestations. Recontactez-le pour établir
					un contrat.
				</Typography>
			{/if}
		{/if}
	</div>
	<ModalSeanceBilan
		{show}
		options={data?.coaches}
		options2={data?.structures}
		options3={data?.rooms}
		on:confirm={handleBilanConfirm}
		bind:showSeanceBilanModal
	/>
</div>
