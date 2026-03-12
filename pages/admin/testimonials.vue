<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Manage Testimonials</h1>
    </div>

    <!-- Testimonials Table -->
    <div class="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="pending" class="text-center">
            <td colspan="4" class="px-6 py-4 text-sm text-gray-500">Loading testimonials...</td>
          </tr>
          <tr v-else-if="testimonials.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No testimonials found.</td>
          </tr>
          <tr v-for="t in testimonials" :key="t.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-gray-900">{{ t.name }}</div>
              <div class="text-sm text-gray-500 mt-1 line-clamp-2">{{ t.message }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">
              {{ '★'.repeat(t.rating) }}{{ '☆'.repeat(5 - t.rating) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                :class="{
                  'bg-green-100 text-green-800': t.status === 'approved',
                  'bg-yellow-100 text-yellow-800': t.status === 'pending',
                  'bg-red-100 text-red-800': t.status === 'rejected'
                }">
                {{ t.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button v-if="t.status === 'pending'" @click="updateStatus(t.id, 'approved')" class="text-green-600 hover:text-green-900 mr-3">Approve</button>
              <button v-if="t.status === 'pending'" @click="updateStatus(t.id, 'rejected')" class="text-yellow-600 hover:text-yellow-900 mr-3">Reject</button>
              <button @click="deleteItem(t.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const $api = useApi()

const { data: testimonials, pending, refresh } = useAsyncData('admin-testimonials', 
  () => $api('/testimonials/admin'), { default: () => [] }
)

const updateStatus = async (id: string, status: string) => {
  try {
    await $api(`/testimonials/${id}/status`, {
      method: 'PATCH',
      body: { status }
    })
    refresh()
  } catch (err) {
    alert('Failed to update status')
  }
}

const deleteItem = async (id: string) => {
  if(!confirm('Delete this testimonial?')) return
  try {
    await $api(`/testimonials/${id}`, { method: 'DELETE' })
    refresh()
  } catch(e) {
    alert('Failed to delete')
  }
}
</script>
