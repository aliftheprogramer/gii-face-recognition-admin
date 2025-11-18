<!-- app/layouts/default.vue -->

<template>
  <div class="flex min-h-screen bg-[#EFEFEF] font-sans text-gray-900">
    <SideNavbar />

    <main class="flex-1 ml-64 p-8">
      <slot />
    </main>
  </div>
</template>