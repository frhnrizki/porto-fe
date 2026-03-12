<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="font-bold text-xl tracking-tight text-indigo-600">Farhan's Portfolio</div>
        <div class="flex space-x-4">
          <NuxtLink to="/" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</NuxtLink>
          <NuxtLink to="/login" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Admin</NuxtLink>
        </div>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer class="bg-white border-t mt-auto py-8 text-center text-gray-500 text-sm">
        &copy; {{ new Date().getFullYear() }} Dynamic Portfolio CMS
    </footer>
  </div>
</template>
