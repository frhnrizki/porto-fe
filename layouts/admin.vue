<template>
  <div class="h-screen flex bg-gray-100 font-sans text-gray-900 overflow-hidden" style="font-family: 'Montserrat', sans-serif;">
    <!-- Sidebar -->
    <aside class="w-64 bg-white text-gray-900 flex flex-col">
      <div class="h-16 flex items-center justify-center font-bold text-xl tracking-wider border-b border-gray-200">
        Admin CMS
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <NuxtLink to="/admin" class="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-gray-200 transition text-gray-700 font-medium" exact-active-class="bg-gray-200 text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/projects" class="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-gray-200 transition text-gray-700 font-medium" active-class="bg-gray-200 text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
          Projects
        </NuxtLink>
        <NuxtLink to="/admin/testimonials" class="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-gray-200 transition text-gray-700 font-medium" active-class="bg-gray-200 text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Testimonials
        </NuxtLink>
        <NuxtLink to="/admin/experiences" class="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-gray-200 transition text-gray-700 font-medium" active-class="bg-gray-200 text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          Experiences
        </NuxtLink>
        <NuxtLink to="/admin/stacks" class="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-gray-200 transition text-gray-700 font-medium" active-class="bg-gray-200 text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.1 6.02a2 2 0 0 0 0 3.66l9.07 3.84a2 2 0 0 0 1.66 0l9.07-3.84a2 2 0 0 0 0-3.66z"/><path d="m2.1 11.84 9.07 3.84a2 2 0 0 0 1.66 0l9.07-3.84"/><path d="m2.1 16.16 9.07 3.84a2 2 0 0 0 1.66 0l9.07-3.84"/></svg>
          Stacks
        </NuxtLink>
        <NuxtLink to="/admin/contacts" class="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-gray-200 transition text-gray-700 font-medium" active-class="bg-gray-200 text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Messages
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-200">
        <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 focus:text-red-600 rounded-md transition flex items-center group">
          <svg class="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <header class="h-16 bg-white shadow-sm flex items-center px-6 justify-end border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-yellow-400 overflow-hidden flex items-end justify-center">
            <img src="/pageweb/fp.png" alt="Profile avatar" class="w-[90%] h-[90%] object-contain object-bottom" />
          </div>
          <div class="flex flex-col">
            <span class="text-[15px] font-semibold text-gray-900 leading-tight">Farhan Rizki</span>
            <span class="text-[13px] text-gray-400 font-medium leading-tight">Admin</span>
          </div>
        </div>
      </header>
      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { logout, isLoggedIn } = useAuth()
const router = useRouter()

// Middleware check
if (!isLoggedIn.value) {
    router.push('/login')
}
</script>
