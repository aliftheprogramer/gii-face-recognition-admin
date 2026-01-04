<script setup lang="ts">
interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
}

// Definisikan prop yang akan diterima oleh komponen
defineProps<{
  user: User;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'delete'): void;
}>();
</script>

<template>
  <div 
    class="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-center group relative hover:border-blue-200 transition-colors" 
  >
    <img 
      :src="user.photo" 
      :alt="user.name + ' Photo'" 
      class="w-24 h-24 rounded-lg object-cover bg-gray-200" 
    >
    
    <div class="flex flex-col justify-between h-full flex-1"> 
      
      <div> 
        <h3 class="font-visby font-extrabold text-gray-900 text-l leading-snug ">
          {{ user.name }}
        </h3>
        
        <p class="font-visby font-extrabold text-gray-400 text-base leading-tight">
          {{ user.email }}
        </p>
      </div>

      <div class="flex justify-between items-end">
        <button 
          @click="emit('click')"
          class="text-blue-500 text-sm font-semibold text-left hover:underline"
        >
          Lihat detail
        </button>
        
        <button 
          @click.stop="emit('delete')"
          class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Hapus pengguna"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>