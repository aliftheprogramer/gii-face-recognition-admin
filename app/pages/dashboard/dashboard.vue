<!-- app/pages/dashboard/dashboard.vue -->
 <script setup lang="ts">
// Mock Data User sesuai gambar
const users = ref(Array(9).fill({
  name: 'Budi Siregar',
  email: 'budisiregar@gmail.com',
  photo: 'https://i.pravatar.cc/150?img=12' // Placeholder image
}));
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
      <div class="p-3 bg-gray-50 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-gray-800">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>
      <div>
        <h2 class="text-gray-700 font-bold text-lg">Jumlah Terdaftar</h2>
        <p class="text-2xl font-bold text-gray-900">67</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="(user, index) in users" 
        :key="index" 
        class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
      >
        <img 
          :src="user.photo" 
          alt="User" 
          class="w-16 h-16 rounded-lg object-cover bg-gray-200"
        >
        <div class="flex flex-col">
          <h3 class="font-bold text-gray-900 text-base">{{ user.name }}</h3>
          <p class="text-gray-400 text-xs mb-2">{{ user.email }}</p>
          <button class="text-blue-500 text-sm font-semibold text-left hover:underline">
            Lihat detail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>