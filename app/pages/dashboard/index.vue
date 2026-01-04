<script setup lang="ts">
definePageMeta({ middleware: ['auth'] as any })

import { ref, onMounted } from 'vue'
import { ENDPOINTS, buildFileUrl, apiRequest } from '../../../utils/core'
import { getAccessToken } from '../../../utils/auth'

const users = ref<Array<{ id: string; name: string; email: string; photo: string }>>([])
const loading = ref(false)
const error = ref('')

// State untuk modal detail
const selectedUser = ref<{ id: string; name: string; email: string; photo: string; faces?: any[] } | null>(null)
const showDetailModal = ref(false)

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
        id: u.id,
        name: u.username || u.name || 'Unknown',
        email: u.email || '',
        photo: firstFace ? buildFileUrl(firstFace) : 'https://i.pravatar.cc/150?img=12',
        faces: u.faces // Simpan data faces untuk detail
      }
    })
  } catch (e: any) {
    error.value = e?.message || 'Gagal memuat pengguna'
  } finally {
    loading.value = false
  }
}

async function deleteUser(id: string) {
  if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return

  try {
    const token = getAccessToken()
    const headers: Record<string,string> = { 
      'Content-Type': 'application/json'
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(ENDPOINTS.deleteUser, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ user_id: id })
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Gagal menghapus pengguna')
    }

    // Update state local
    users.value = users.value.filter(u => u.id !== id)
    alert('Pengguna berhasil dihapus')
    
  } catch (e: any) {
    alert(e.message || 'Terjadi kesalahan saat menghapus pengguna')
  }
}

function openDetail(user: any) {
  selectedUser.value = user
  showDetailModal.value = true
}

function closeDetail() {
  selectedUser.value = null
  showDetailModal.value = false
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    alert('ID berhasil disalin ke clipboard!')
  }).catch(() => {
    alert('Gagal menyalin ID')
  })
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="space-y-6 p-4 relative">
    
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
        :key="user.id || index" 
        :user="user" 
        @click="openDetail(user)"
        @delete="deleteUser(user.id)"
      />
    </div>

    <!-- Modal Detail User -->
    <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeDetail">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        <div class="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <h3 class="font-bold text-lg text-gray-800">Detail Pengguna</h3>
          <button @click="closeDetail" class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-6" v-if="selectedUser">
          <div class="flex flex-col items-center">
            <img 
              :src="selectedUser.photo" 
              class="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm mb-4"
              :alt="selectedUser.name"
            >
            <h4 class="text-xl font-bold text-gray-900">{{ selectedUser.name }}</h4>
            <p class="text-gray-500">{{ selectedUser.email }}</p>
          </div>

          <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h5 class="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide">User ID</h5>
            <div class="flex items-center gap-2">
              <code class="flex-1 bg-white px-3 py-2 rounded border border-blue-200 text-sm font-mono text-gray-800">{{ selectedUser.id }}</code>
              <button 
                @click="copyToClipboard(selectedUser.id)"
                class="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                title="Copy ID"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
              </button>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Informasi Wajah</h5>
            <div class="flex gap-2 overflow-x-auto pb-2">
              <div v-if="selectedUser.faces && selectedUser.faces.length">
                <div class="flex gap-2">
                  <div v-for="(face, idx) in selectedUser.faces" :key="idx" class="w-16 h-16 rounded-md overflow-hidden bg-gray-200 shrink-0">
                     <img :src="buildFileUrl(face.filepath)" class="w-full h-full object-cover">
                  </div>
                </div>
              </div>
              <p v-else class="text-gray-400 text-sm">Tidak ada data wajah tambahan.</p>
            </div>
          </div>
          
          <div class="flex gap-3">
             <button 
                @click="deleteUser(selectedUser.id); closeDetail()"
                class="flex-1 bg-red-50 text-red-600 py-2.5 rounded-lg font-semibold hover:bg-red-100 transition-colors"
             >
                Hapus Pengguna
             </button>
             <button 
                @click="closeDetail"
                class="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
             >
                Tutup
             </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>