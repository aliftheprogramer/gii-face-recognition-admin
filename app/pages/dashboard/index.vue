<script setup lang="ts">
definePageMeta({ middleware: ['auth'] as any })

import { ref, onMounted } from 'vue'
import { ENDPOINTS, buildFileUrl } from '../../../utils/core'
import { getAccessToken } from '../../../utils/auth'

const users = ref<Array<{ name: string; email: string; photo: string }>>([])
const loading = ref(false)
const error = ref('')

async function fetchUsers() {
  loading.value = true
  error.value = ''
  try {
    const token = getAccessToken()
    const headers: Record<string,string> = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(ENDPOINTS.getUsers, { headers })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `HTTP ${res.status}`)
    }

    const data = await res.json().catch(() => ({}))
    // expected shape: { count, users: [ { id, username, email, faces: [...] } ] }
    const list = (data?.users ?? [])
    users.value = list.map((u: any) => {
      const firstFace = (u.faces && u.faces.length) ? u.faces[0].filepath : null
      return {
        name: u.username || u.name || 'Unknown',
        email: u.email || '',
        photo: firstFace ? buildFileUrl(firstFace) : 'https://i.pravatar.cc/150?img=12',
      }
    })
  } catch (e: any) {
    error.value = e?.message || 'Gagal memuat pengguna'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="space-y-6">
    
    <div class="bg-white p-4 rounded-lg border border-gray-100">
      <div class="flex items-center gap-3 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search" 
          class="w-full outline-none text-gray-700 placeholder-gray-400"
        />                                   
      </div>
    </div>                                                                                                                                                                                                                                                                         

    <div class="bg-white p-6 rounded-lg border border-gray-100 flex items-center gap-4">
      <div class="p-3 bg-gray-50 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-gray-800">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>
      <div>
        <h2 class="text-gray-700 font-bold text-lg">Jumlah Terdaftar</h2>
        <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-x-[37px] gap-y-4">
      <ItemUser 
        v-for="(user, index) in users" 
        :key="index" 
        :user="user" 
      />
    </div>
  </div>
</template>