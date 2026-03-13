<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Manage Tech Stacks</h1>
      <button @click="openCreateModal" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-[#9520D4] transition shadow-sm text-sm font-medium">
        + New Stack
      </button>
    </div>

    <!-- Stacks Table -->
    <div class="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stack</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="pending" class="text-center">
            <td colspan="4" class="px-6 py-4 text-sm text-gray-500">Loading stacks...</td>
          </tr>
          <tr v-else-if="stacks.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No stacks found.</td>
          </tr>
          <tr v-for="stack in stacks" :key="stack.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-8 w-8 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center p-1">
                  <img v-if="stack.icon_url" :src="stack.icon_url" :alt="stack.name" class="h-6 w-6 object-contain" />
                  <div v-else class="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ stack.name }}</div>
                  <div class="text-[11px] text-gray-500 truncate w-48">{{ stack.caption }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="px-2 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-purple-100 text-purple-700': stack.category === 'Design',
                  'bg-blue-100 text-blue-700': stack.category === 'Code',
                  'bg-orange-100 text-orange-700': stack.category === 'Tools'
                }">
                {{ stack.category }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ stack.order_index }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openEditModal(stack)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="deleteStack(stack.id)" class="text-red-600 hover:text-red-900 ml-3">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Stack Modal -->
    <div v-if="showModal" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveStack">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6 border-b pb-2">
                {{ editingId ? 'Edit Stack' : 'Create New Stack' }}
              </h3>

              <div class="space-y-5">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="form.name" required type="text" placeholder="e.g. Figma" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select v-model="form.category" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="Design">Design</option>
                      <option value="Code">Code</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Caption</label>
                  <input v-model="form.caption" type="text" placeholder="Short description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Icon</label>
                  <input type="file" @change="handleFileUpload" accept="image/*" class="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                  <p v-if="form.icon_url" class="mt-1 text-[10px] text-gray-400 truncate">{{ form.icon_url }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Order Index</label>
                  <input v-model.number="form.order_index" type="number" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
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

const { data: stacks, pending, refresh } = useAsyncData('admin-stacks',
  () => $api<any[]>('/about/stacks'), { default: () => [] }
)

const showModal = ref(false)
const saving = ref(false)
const editingId = ref<string | null>(null)
const fileInput = ref<File | null>(null)

const form = reactive({
  name: '',
  caption: '',
  icon_url: '',
  category: 'Design',
  order_index: 0
})

const openCreateModal = () => {
  editingId.value = null
  Object.assign(form, {
    name: '',
    caption: '',
    icon_url: '',
    category: 'Design',
    order_index: stacks.value.length
  })
  fileInput.value = null
  showModal.value = true
}

const openEditModal = (stack: any) => {
  editingId.value = stack.id
  Object.assign(form, {
    name: stack.name || '',
    caption: stack.caption || '',
    icon_url: stack.icon_url || '',
    category: stack.category || 'Design',
    order_index: stack.order_index || 0
  })
  fileInput.value = null
  showModal.value = true
}

const handleFileUpload = (e: any) => {
  fileInput.value = e.target.files[0]
}

const saveStack = async () => {
  saving.value = true
  try {
    let finalIconUrl = form.icon_url

    // 1. Upload file if exists
    if (fileInput.value) {
      const formData = new FormData()
      formData.append('file', fileInput.value)

      const uploadRes: any = await $api('/about/upload-icon', {
        method: 'POST',
        body: formData
      })
      finalIconUrl = uploadRes.url
    }

    const payload = {
      ...form,
      icon_url: finalIconUrl
    }

    if (editingId.value) {
      await $api(`/about/stacks/${editingId.value}`, {
        method: 'PATCH',
        body: payload
      })
    } else {
      await $api('/about/stacks', {
        method: 'POST',
        body: payload
      })
    }
    showModal.value = false
    refresh()
  } catch (err: any) {
    alert(err.message || 'Failed to save stack')
  } finally {
    saving.value = false
  }
}

const deleteStack = async (id: string) => {
  if (!confirm('Are you sure you want to delete this stack?')) return
  try {
    await $api(`/about/stacks/${id}`, { method: 'DELETE' })
    refresh()
  } catch (e: any) {
    alert(e.message || 'Failed to delete stack')
  }
}
</script>
