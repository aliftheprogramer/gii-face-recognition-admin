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
    class="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-center" 
    >
    <img 
      :src="user.photo" 
      :alt="user.name + ' Photo'" 
      class="w-32 h-32 rounded-lg object-cover bg-gray-200" 
      >
    
    <div class="flex flex-col justify-between h-full"> 
      
      <div> 
        <h3 class="font-visby font-extrabold text-gray-900 text-xl leading-snug">
          {{ user.name }}
        </h3>
        
        <p class="font-visby font-extrabold text-gray-400 text-base leading-snug">
          {{ user.email }}
        </p>
      </div>

      <button class="text-blue-500 text-sm font-semibold text-left hover:underline">
        Lihat detail
      </button>
    </div>
  </div>
</template>