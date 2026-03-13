<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Manage Experiences</h1>
      <button @click="openCreateModal" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-[#9520D4] transition shadow-sm text-sm font-medium">
        + New Experience
      </button>
    </div>

    <!-- Experiences Table -->
    <div class="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Company</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="pending" class="text-center">
            <td colspan="4" class="px-6 py-4 text-sm text-gray-500">Loading experiences...</td>
          </tr>
          <tr v-else-if="experiences.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No experiences found.</td>
          </tr>
          <tr v-for="exp in experiences" :key="exp.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ exp.role }}</div>
              <div class="text-xs text-gray-500">{{ exp.company }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ exp.date_range }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ exp.order_index }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openEditModal(exp)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="deleteExperience(exp.id)" class="text-red-600 hover:text-red-900 ml-3">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Experience Modal -->
    <div v-if="showModal" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveExperience">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6 border-b pb-2">
                {{ editingId ? 'Edit Experience' : 'Create New Experience' }}
              </h3>

              <div class="space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Role</label>
                  <input v-model="form.role" required type="text" placeholder="e.g. UX/UI Designer" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Company</label>
                  <input v-model="form.company" required type="text" placeholder="e.g. Google" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Date Range</label>
                  <input v-model="form.date_range" required type="text" placeholder="e.g. 2021 - Present" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Order Index</label>
                  <input v-model.number="form.order_index" type="number" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <p class="mt-1 text-xs text-gray-400">Lower numbers appear first.</p>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" :disabled="saving" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2.5 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                {{ saving ? 'Saving...' : (editingId ? 'Update' : 'Save') }}
              </button>
              <button type="button" @click="showModal = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAsyncData } from '#app'
import { useApi } from '~/composables/useApi'

definePageMeta({ layout: 'admin' })

const $api = useApi()

const { data: experiences, pending, refresh } = useAsyncData('admin-experiences',
  () => $api<any[]>('/about/experiences'), { default: () => [] }
)

const showModal = ref(false)
const saving = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  role: '',
  company: '',
  date_range: '',
  order_index: 0
})

const openCreateModal = () => {
  editingId.value = null
  Object.assign(form, {
    role: '',
    company: '',
    date_range: '',
    order_index: experiences.value.length
  })
  showModal.value = true
}

const openEditModal = (exp: any) => {
  editingId.value = exp.id
  Object.assign(form, {
    role: exp.role || '',
    company: exp.company || '',
    date_range: exp.date_range || '',
    order_index: exp.order_index || 0
  })
  showModal.value = true
}

const saveExperience = async () => {
  saving.value = true
  try {
    if (editingId.value) {
      await $api(`/about/experiences/${editingId.value}`, {
        method: 'PATCH',
        body: form
      })
    } else {
      await $api('/about/experiences', {
        method: 'POST',
        body: form
      })
    }
    showModal.value = false
    refresh()
  } catch (err: any) {
    alert(err.message || 'Failed to save experience')
  } finally {
    saving.value = false
  }
}

const deleteExperience = async (id: string) => {
  if (!confirm('Are you sure you want to delete this experience?')) return
  try {
    await $api(`/about/experiences/${id}`, { method: 'DELETE' })
    refresh()
  } catch (e: any) {
    alert(e.message || 'Failed to delete experience')
  }
}
</script>
