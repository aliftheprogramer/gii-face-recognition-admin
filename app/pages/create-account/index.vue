<script setup lang="ts">
// State untuk menyimpan data input form
const userName = ref('budi siregar'); // Nilai default sesuai contoh gambar
const userEmail = ref('budisiregar@gmail.com'); // Nilai default sesuai contoh gambar
const isUploading = ref(false);
const uploadedFiles = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

// Fungsi untuk menangani aksi simpan
async function handleSubmit() {
  if (!userName.value) {
    alert('Nama Pengguna wajib diisi!');
    return;
  }
  
  if (uploadedFiles.value.length === 0) {
    alert('Minimal upload 1 foto wajah!');
    return;
  }

  isUploading.value = true;
  
  // Persiapan FormData untuk upload
  const formData = new FormData();
  formData.append('name', userName.value);
  formData.append('email', userEmail.value);
  
  uploadedFiles.value.forEach((file) => {
    formData.append('photos', file);
  });

  console.log('Data yang akan dikirim:', {
    name: userName.value,
    email: userEmail.value,
    files: uploadedFiles.value.map(f => f.name)
  });
  
  // Simulasi proses upload
  setTimeout(() => {
    isUploading.value = false;
    alert('Akun berhasil dibuat! (Simulasi)');
    // Reset form opsional
  }, 1500);
}

// Validasi dan proses file
function processFiles(files: FileList | null) {
  if (!files) return;
  
  const newFiles: File[] = [];
  const maxFiles = 5;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) {
      alert(`File "${file.name}" bukan gambar.`);
      continue;
    }
    newFiles.push(file);
  }

  if (uploadedFiles.value.length + newFiles.length > maxFiles) {
    alert(`Maksimal hanya boleh upload ${maxFiles} foto.`);
    const remainingSlots = maxFiles - uploadedFiles.value.length;
    uploadedFiles.value = [...uploadedFiles.value, ...newFiles.slice(0, remainingSlots)];
  } else {
    uploadedFiles.value = [...uploadedFiles.value, ...newFiles];
  }
}

// Handle file select dari input hidden
function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  processFiles(input.files);
  // Reset input value agar user bisa memilih file yang sama lagi jika dihapus
  if (input) input.value = ''; 
}

// Handle drag & drop
function onDrop(e: DragEvent) {
  const files = e.dataTransfer?.files;
  if (files) {
    processFiles(files);
  }
}

// Hapus file dari list
function removeFile(index: number) {
  uploadedFiles.value.splice(index, 1);
}

// Generate object URL untuk preview
function getPreviewUrl(file: File) {
  return URL.createObjectURL(file);
}
</script>

<template>
  <div class="p-4 md:p-4 bg-[#EFEFEF] min-h-screen">
    <main class="max-w-6xl mx-auto">
      <div class="space-y-6">
        <div class="bg-white p-4 rounded-lg border border-gray-100">
          <div class="flex items-center gap-3 text-gray-400">
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

        <div class="bg-white p-6 rounded-lg border border-gray-100 space-y-6">
        
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
          <div class="flex justify-between items-center">
            <label class="block text-sm font-semibold text-gray-700">
              Masukan 5 foto wajah
            </label>
            <span class="text-sm text-gray-400">{{ uploadedFiles.length }}/5</span>
          </div>
          
          <!-- Hidden Input -->
          <input 
            ref="fileInput"
            type="file" 
            multiple 
            accept="image/*" 
            class="hidden" 
            @change="handleFileSelect"
          >

          <div 
            class="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center bg-gray-50 transition-colors hover:border-blue-500 cursor-pointer"
            @dragover.prevent 
            @drop.prevent="onDrop"
            @click="fileInput?.click()"
          >
            <div class="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <p class="text-gray-500">Tarik dan Taruh Gambar disini atau Klik untuk Upload</p>
              <p class="text-xs text-gray-400 mt-1">Format: JPG, PNG. Maks 5 file.</p>
            </div>
          </div>

          <!-- Preview Section -->
          <div v-if="uploadedFiles.length > 0" class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <div 
              v-for="(file, index) in uploadedFiles" 
              :key="index" 
              class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
            >
              <img 
                :src="getPreviewUrl(file)" 
                class="w-full h-full object-cover" 
                alt="Preview"
              >
              <button 
                @click.stop="removeFile(index)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

        </div>
        
        <div class="pt-4">
          <button 
            @click="handleSubmit"
            :disabled="isUploading"
            class="w-full py-3 md:py-4 rounded-lg font-semibold text-lg transition-colors"
            :class="{ 
                'bg-blue-500 text-white hover:bg-blue-600': !isUploading, 
                'bg-gray-400 text-gray-700 cursor-not-allowed': isUploading 
            }"
          >
            {{ isUploading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>