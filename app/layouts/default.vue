<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import SideNavbar from '../components/SideNavbar.vue'
import { authStore, isTokenValid } from '../../utils/auth'

const showSidebar = ref(false)

// immediate sync from current authStore value
showSidebar.value = !!authStore.value

// whenever authStore changes, verify token and update sidebar visibility
watch(authStore, async (val) => {
  if (!val) {
    showSidebar.value = false
    return
  }
  try {
    const valid = await isTokenValid()
    showSidebar.value = valid
  } catch (e) {
    showSidebar.value = false
  }
}, { immediate: true })
</script>

<template>
  <div class="flex min-h-screen bg-[#EFEFEF] font-sans text-gray-900">
    <SideNavbar v-if="showSidebar" />

    <main :class="showSidebar ? 'flex-1 ml-64 py-8 px-[36px]' : 'flex-1 py-8 px-[36px]'">
      <slot />
    </main>
  </div>
</template>