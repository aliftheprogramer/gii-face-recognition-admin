<!-- app/components/ItemUser.vue -->
 <script setup lang="ts">
interface User {
  name: string;
  email: string;
  photo: string;
}

// Definisikan prop yang akan diterima oleh komponen
defineProps<{
  user: User;
}>();
</script>

<template>
  <div 
    class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
  >
    <img 
      :src="user.photo" 
      :alt="user.name + ' Photo'" 
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
</template>