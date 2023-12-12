<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Function to handle redirection to the homepage
	function redirectToHome() {
		goto('/');
	}
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100 p-6">
	<div class="text-center">
		<h1 class="text-6xl font-extrabold text-gray-800 mb-4">
			Oups! Erreur {$page.status}
		</h1>
		<p class="text-xl text-gray-600 mb-6">
			{$page.error?.message}
		</p>
		<button
			class="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg shadow transition duration-300 ease-in-out"
			on:click={redirectToHome}
		>
			Retour à la page d'accueil
		</button>
	</div>
</div>
