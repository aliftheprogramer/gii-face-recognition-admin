<template>
  <div class="flex min-h-screen bg-[#EFEFEF] font-sans text-gray-900">
    <SideNavbar />

    <main class="flex-1 ml-64 py-8 px-[36px]">
      <slot />
    </main>
  </div>
</template>