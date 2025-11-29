<script setup lang="ts">
// State untuk menyimpan data input form
const userName = ref('budi siregar'); // Nilai default sesuai contoh gambar
const userEmail = ref('budisiregar@gmail.com'); // Nilai default sesuai contoh gambar
const isUploading = ref(false);

// Fungsi untuk menangani aksi simpan
function handleSubmit() {
  if (!userName.value) {
    alert('Nama Pengguna wajib diisi!');
    return;
  }
  // Logika untuk menyimpan data atau upload foto akan ditambahkan di sini
  isUploading.value = true;
  console.log('Data yang disimpan:', {
    name: userName.value,
    email: userEmail.value,
  });
  
  // Contoh simulasi proses
  setTimeout(() => {
    isUploading.value = false;
    alert('Akun berhasil dibuat! (Simulasi)');
  }, 1500);
}

// Fungsi untuk drag & drop (hanya UI dasar, logika upload belum disertakan)
function onDrop(e: DragEvent) {
  e.preventDefault();
  const files = e.dataTransfer?.files;
  if (files && files.length) {
    console.log(`Menerima ${files.length} file.`);
    // TODO: Tambahkan logika validasi dan upload file
  }
}
</script>

<template>
  <div class="p-6 md:p-10 bg-gray-50 min-h-screen">
    <header class="mb-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            class="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto">
      <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-1">
              Nama Pengguna
            </label>
            <input 
              id="name"
              v-model="userName"
              type="text" 
              class="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
              placeholder="Masukkan nama pengguna"
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">
              Email (opsional)
            </label>
            <input 
              id="email"
              v-model="userEmail"
              type="email" 
              class="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
              placeholder="Masukkan email"
            >
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">
            Masukan 5 foto wajah
          </label>
          <div 
            class="border-2 border-dashed border-gray-300 p-16 rounded-xl text-center bg-gray-50 transition-colors hover:border-blue-500"
            @dragover.prevent 
            @drop="onDrop"
          >
            <div class="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <p class="text-gray-500">Tarik dan Taruh Gambar disini</p>
            </div>
          </div>
        </div>
        
        <div class="pt-4">
          <button 
            @click="handleSubmit"
            :disabled="isUploading"
            class="w-full p-3 rounded-lg font-semibold transition-colors"
            :class="{ 
                'bg-blue-500 text-white hover:bg-blue-600': !isUploading, 
                'bg-gray-400 text-gray-700 cursor-not-allowed': isUploading 
            }"
          >
            {{ isUploading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>