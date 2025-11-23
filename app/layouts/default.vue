<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SideNavbar from '../components/SideNavbar.vue'
import { getAuth, isTokenValid } from '../../utils/auth'

const showSidebar = ref(false)

onMounted(async () => {
  // quick presence check first
  const auth = getAuth()
  if (!auth) return

  // verify token validity (fast path may use expiry_at inside isTokenValid)
  try {
    const valid = await isTokenValid()
    showSidebar.value = valid
  } catch (e) {
    showSidebar.value = false
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-[#EFEFEF] font-sans text-gray-900">
    <SideNavbar v-if="showSidebar" />

    <main :class="showSidebar ? 'flex-1 ml-64 py-8 px-[36px]' : 'flex-1 py-8 px-[36px]'">
      <slot />
    </main>
  </div>
</template>