<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ENDPOINTS } from  '../../../utils/core'
import { useRouter } from 'vue-router'
import { setAuth, isTokenValid } from '../../../utils/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const router = useRouter()

async function handleSubmit() {
	error.value = ''
 	if (!email.value || !password.value) {
 		error.value = 'Mohon isi email dan password.'
 		return
 	}

 	loading.value = true
 	try {
 		const res = await fetch(ENDPOINTS.login, {
 			method: 'POST',
 			headers: { 'Content-Type': 'application/json' },
 			body: JSON.stringify({ email: email.value, password: password.value }),
 		})

 		if (!res.ok) {
 			const errText = await res.text().catch(() => '')
 			throw new Error(errText || `HTTP ${res.status}`)
 		}

				const data = await res.json().catch(() => ({}))
				// Expected response structure: access_token, refresh_token, token_type, expires_in, admin
				if (data?.access_token){
					setAuth({
						access_token: data.access_token,
						refresh_token: data.refresh_token,
						token_type: data.token_type,
						expires_in: data.expires_in,
						admin: data.admin,
					})
				}

 		// redirect to dashboard
 		router.push('/dashboard')
 	} catch (err: any) {
 		error.value = err?.message || 'Login gagal'
 	} finally {
 		loading.value = false
 	}
}

onMounted(async () => {
	// client-side check: if token exists and valid, redirect to dashboard
	try {
		const valid = await isTokenValid()
		if (valid) {
			router.push('/dashboard')
		}
	} catch (e) {
		// ignore
	}
})
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
		<div class="w-full max-w-md bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
			<div class="flex flex-col items-center mb-6">
				<!-- Pastikan file face.png ada di assets/image/ -->
				<img src="~/assets/image/face.png" alt="Face" class="w-24 h-24 mb-4" />
				<h1 class="text-xl font-bold text-gray-800">Masuk</h1>
				<p class="text-gray-400 text-sm">Silakan login untuk melanjutkan</p>
			</div>

			<form @submit.prevent="handleSubmit" class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-600 mb-1" for="email">Email</label>
					<input
						id="email"
						v-model="email"
						type="email"
						placeholder="you@example.com"
						class="w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 text-sm text-gray-700 bg-white"
						autocomplete="email"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-600 mb-1" for="password">Password</label>
						<input
							id="password"
							v-model="password"
							type="password"
							placeholder="••••••••"
							class="w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 text-sm text-gray-700 bg-white"
							autocomplete="current-password"
						/>
				</div>
				<div v-if="error" class="text-red-500 text-xs">{{ error }}</div>
				<button
					type="submit"
					:disabled="loading"
					class="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg py-2 text-sm transition-colors"
				>
					<span v-if="!loading">Login</span>
					<span v-else>Mengirim...</span>
				</button>
			</form>

			<div class="mt-6 text-center">
				<NuxtLink to="/create-account" class="text-blue-600 hover:underline text-sm font-medium">Buat akun baru</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
