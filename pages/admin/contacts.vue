<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Manage Messages</h1>
    </div>

    <!-- Contacts Table -->
    <div class="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="pending" class="text-center">
            <td colspan="4" class="px-6 py-4 text-sm text-gray-500">Loading messages...</td>
          </tr>
          <tr v-else-if="contacts.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No messages found.</td>
          </tr>
          <tr v-for="c in contacts" :key="c.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ c.name }}</div>
              <div class="text-sm text-gray-500">{{ c.email }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-600 line-clamp-2 max-w-md">{{ c.message }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(c.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="deleteItem(c.id)" class="text-red-600 hover:text-red-900">Delete</button>
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

interface Contact {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

const { data: contacts, pending, refresh } = useAsyncData<Contact[]>('admin-contacts', 
  () => $api('/contacts'), { default: () => [] }
)

const deleteItem = async (id: number) => {
  if(!confirm('Delete this message?')) return
  try {
    await $api(`/contacts/${id}`, { method: 'DELETE' })
    refresh()
  } catch(e) {
    alert('Failed to delete')
  }
}
</script>
