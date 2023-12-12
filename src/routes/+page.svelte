<script lang="ts">
	import { enhance } from '$app/forms';

	import { FORM_NAMES,APP_NAME } from '~/lib/consts';
	import logoSrc from '$lib/assets/logo-sparta.svg';
	import backgroundMarbreSrc from '$lib/assets/fond-marbre.png';

	import Button from '~/components/Button/Button.svelte';
	import Input from '~/components/Input/Input.svelte';
	import Typography from '~/components/Global/Typography.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Login Page - {APP_NAME}</title>
	<meta name="Login" />
</svelte:head>

<div
	style="background-image : url({backgroundMarbreSrc})"
	class="flex flex-col h-screen bg-no-repeat bg-center bg-cover"
>
	<div class="h-full flex justify-center items-center">
		<img
			loading="lazy"
			alt="Logo Sparta, centre de coaching privé"
			src={logoSrc}
			class="aspect-[1.37] w-full max-w-[17rem]"
		/>
	</div>

	<!-- Form -->
	<div
		class="items-stretch bg-white flex w-full flex-col pt-10 pb-12 px-4 rounded-3xl gap-8"
	>
		<Typography
			as="h2"
			color="gray-900"
			variant="2xl"
			class="font-bold leading-8 whitespace-nowrap"
		>
			Connexion
		</Typography>
		<div class="items-stretch flex flex-col gap-8">
			<form use:enhance method="POST" class="flex flex-col gap-8">
				<fieldset class="flex flex-col gap-4">
					<!-- TODO remove hardcoded values -->
					<Input
						name={FORM_NAMES.login.username}
						label="Login"
						type="text"
						placeholder="coach.nicolas"
						required
						value="Lucas CANO"
					/>
					<Input
						name={FORM_NAMES.login.password}
						label="Mot de passe"
						type="password"
						placeholder="8 caractères"
						value="COA373"
						required
					/>
				</fieldset>
				{#if form?.error}
					<Typography as="p" variant="sm" color="rose-600" class="text-center"
						>{form.error}</Typography
					>
				{/if}
				<Button type="submit" variant="primary">Se connecter</Button>
			</form>
		</div>
	</div>
</div>
