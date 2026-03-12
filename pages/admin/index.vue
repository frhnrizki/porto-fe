<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

    <div v-if="pending" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="metrics" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total Projects -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Total Projects</p>
          <p class="text-3xl font-bold text-indigo-600 mt-2">{{ metrics.totalProjects }}</p>
        </div>
        <div class="p-3 bg-indigo-50 rounded-full">
          <svg class="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
      </div>

      <!-- Approved Testimonials -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Total Testimonials</p>
          <p class="text-3xl font-bold text-green-600 mt-2">{{ metrics.totalTestimonials }}</p>
        </div>
        <div class="p-3 bg-green-50 rounded-full">
          <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
      </div>

      <!-- Pending Testimonials -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition" @click="$router.push('/admin/testimonials')">
        <div>
          <p class="text-sm font-medium text-gray-500">Pending Approvals</p>
          <p class="text-3xl font-bold text-amber-500 mt-2">{{ metrics.pendingTestimonials }}</p>
        </div>
        <div class="p-3 bg-amber-50 rounded-full">
          <svg class="h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const $api = useApi()

const { data: metrics, pending } = useAsyncData('dashboard-metrics', 
  () => $api('/dashboard/metrics')
)
</script>
