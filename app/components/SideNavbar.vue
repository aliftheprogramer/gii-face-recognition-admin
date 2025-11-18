<!-- app/components/SideNavbar.vue -->

<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <aside class="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">

        <div class="p-6 flex items-center gap-3">
            <img src="~/assets/image/face.png" alt="Face Recognition Logo"
                class="w-[65px] h-[65px] rounded-lg object-cover opacity-100">
            <div>
                <h1 class=" font-bold text-[24px] leading-[120%] tracking-normal text-gray-900">
                    Face<br>Recognition
                </h1>
            </div>
        </div>

        <div class="px-6 py-4 mb-4">
            <div class="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?img=11" alt="Admin"
                    class="w-[42px] h-[42px] rounded-full object-cover border border-gray-200">
                <div>
                    <p class="font-['Visby_CF'] font-semibold text-[12px] leading-[120%] text-gray-800 text-center">
                        Name
                    </p>
                    <p class="font-['Visby_CF'] font-semibold text-[12px] leading-[120%] text-gray-400 text-center">
                        Admin
                    </p>
                </div>
                <div class="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>

        <nav class="flex-1 px-4 space-y-2">
            <NuxtLink to="/dashboard"
                class="flex items-center w-[230px] h-[44px] gap-[18px] pl-[9px] py-[10px] border-r-2 transition-colors group"
                :class="route.path === '/dashboard'
                    ? 'border-blue-600 bg-blue-50 text-blue-600 rounded-l-lg rounded-r-none'
                    : 'border-transparent text-gray-400 hover:bg-gray-50 rounded-lg'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-[24px] h-[24px]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>

                <span
                    class="font-['Red_Hat_Display'] font-normal text-[12px] leading-[16px] tracking-normal text-center">
                    Dashboard
                </span>
            </NuxtLink>

            <NuxtLink to="/create-account"
                class="flex items-center w-[230px] h-[44px] gap-[18px] pl-[9px] py-[10px] border-r-2 transition-colors group"
                :class="route.path === '/akun'
                    ? 'border-blue-600 bg-blue-50 text-blue-600 rounded-l-lg rounded-r-none'
                    : 'border-transparent text-gray-400 hover:bg-gray-50 rounded-lg'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-[24px] h-[24px]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                <span
                    class="font-['Red_Hat_Display'] font-normal text-[12px] leading-[16px] tracking-normal text-center">
                    Pembuatan Akun
                </span>
            </NuxtLink>
        </nav>

        <div class="p-6 mt-auto">
            <button
                class="flex items-center w-[230px] h-[44px] gap-[18px] pl-[9px] py-[10px] border-r-2 border-transparent text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-[24px] h-[24px]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                <span
                    class="font-['Red_Hat_Display'] font-normal text-[12px] leading-[16px] tracking-normal text-center">
                    Keluar
                </span>
            </button>
        </div>
    </aside>
</template>