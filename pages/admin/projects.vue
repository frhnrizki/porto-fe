<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Manage Projects</h1>
      <button @click="openCreateModal" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-[#9520D4] transition shadow-sm text-sm font-medium">
        + New Project
      </button>
    </div>

    <!-- Projects Table -->
    <div class="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client & Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="pending" class="text-center">
            <td colspan="5" class="px-6 py-4 text-sm text-gray-500">Loading projects...</td>
          </tr>
          <tr v-else-if="projects.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No projects found.</td>
          </tr>
          <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                  <img v-if="project.image_url" :src="project.image_url" alt="" class="h-10 w-10 object-cover" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ project.title }}</div>
                  <div class="text-sm text-gray-500 truncate w-48">{{ project.tech_stack }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ project.client || '-' }}</div>
              <div class="text-xs text-gray-500">{{ project.project_date ? new Date(project.project_date).toLocaleDateString() : '-' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize"
                :class="{
                  'bg-green-100 text-green-800': project.status === 'published',
                  'bg-gray-100 text-gray-800': project.status === 'draft',
                  'bg-red-100 text-red-800': project.status === 'archived'
                }">
                {{ project.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(project.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openEditModal(project)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-900 ml-3">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Project Modal -->
    <div v-if="showModal" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form @submit.prevent="saveProject">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6 border-b pb-2">
                {{ editingId ? 'Edit Project' : 'Create New Project' }}
              </h3>

              <div class="space-y-5 max-h-[65vh] overflow-y-auto px-1">
                <!-- Basic Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Title</label>
                    <input v-model="form.title" required type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="form.description" rows="3" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                  </div>
                </div>

                <!-- Detail Content -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Process</label>
                    <textarea v-model="form.process" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Impact</label>
                    <textarea v-model="form.impact" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                  </div>
                </div>

                <!-- Meta Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Client</label>
                    <input v-model="form.client" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Project Date</label>
                    <input v-model="form.project_date" type="date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
                    <input v-model="form.tech_stack" type="text" placeholder="Vue, Nuxt, Tailwind" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Project URL</label>
                    <input v-model="form.project_url" type="url" placeholder="https://..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  </div>
                </div>

                <!-- Status & Image -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <select v-model="form.status" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Main Thumbnail</label>
                    <input type="file" @change="handleFileUpload" accept="image/*" class="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                    <p v-if="form.image_url" class="mt-1 text-[10px] text-gray-400 truncate">{{ form.image_url }}</p>
                  </div>
                </div>

                <!-- Gallery URLs -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <label class="block text-sm font-medium text-gray-700">Gallery Image URLs</label>
                    <button type="button" @click="addGalleryUrl" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">+ Add URL</button>
                  </div>
                  <div class="space-y-2">
                    <div v-for="(url, index) in form.gallery_urls" :key="index" class="flex gap-2">
                      <input v-model="form.gallery_urls[index]" type="text" placeholder="https://image-url.com" class="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                      <button type="button" @click="removeGalleryUrl(index)" class="p-2 text-red-500 hover:bg-red-50 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2 2H3"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                      </button>
                    </div>
                  </div>
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

const { data: projects, pending, refresh } = useAsyncData('admin-projects',
  () => $api<any[]>('/projects'), { default: () => [] }
)

const showModal = ref(false)
const saving = ref(false)
const editingId = ref<string | null>(null)
const fileInput = ref<File | null>(null)

const form = reactive({
  title: '',
  description: '',
  process: '',
  impact: '',
  client: '',
  project_date: '',
  tech_stack: '',
  project_url: '',
  status: 'draft',
  image_url: '',
  gallery_urls: [] as string[]
})

const openCreateModal = () => {
  editingId.value = null
  Object.assign(form, {
    title: '',
    description: '',
    process: '',
    impact: '',
    client: '',
    project_date: '',
    tech_stack: '',
    project_url: '',
    status: 'draft',
    image_url: '',
    gallery_urls: []
  })
  fileInput.value = null
  showModal.value = true
}

const openEditModal = (project: any) => {
  editingId.value = project.id
  Object.assign(form, {
    title: project.title || '',
    description: project.description || '',
    process: project.process || '',
    impact: project.impact || '',
    client: project.client || '',
    project_date: project.project_date ? project.project_date.split('T')[0] : '',
    tech_stack: project.tech_stack || '',
    project_url: project.project_url || '',
    status: project.status || 'draft',
    image_url: project.image_url || '',
    gallery_urls: Array.isArray(project.gallery_urls) ? [...project.gallery_urls] : []
  })
  fileInput.value = null
  showModal.value = true
}

const addGalleryUrl = () => {
  form.gallery_urls.push('')
}

const removeGalleryUrl = (index: number) => {
  form.gallery_urls.splice(index, 1)
}

const handleFileUpload = (e: any) => {
  fileInput.value = e.target.files[0]
}

const saveProject = async () => {
  saving.value = true
  try {
    let finalImageUrl = form.image_url

    // 1. Upload file if exists
    if (fileInput.value) {
      const formData = new FormData()
      formData.append('file', fileInput.value)

      const uploadRes: any = await $api('/projects/upload', {
        method: 'POST',
        body: formData
      })
      finalImageUrl = uploadRes.url
    }

    // Sanitize payload: convert empty strings to null for DB consistency
    const sanitize = (val: any) => {
      if (val === undefined || val === null) return null
      if (typeof val === 'string') {
        return val.trim() !== '' ? val : null
      }
      return val
    }

    const payload = {
      title: form.title,
      description: form.description,
      process: sanitize(form.process),
      impact: sanitize(form.impact),
      client: sanitize(form.client),
      project_date: sanitize(form.project_date),
      tech_stack: sanitize(form.tech_stack),
      project_url: sanitize(form.project_url),
      status: form.status,
      image_url: finalImageUrl || null,
      gallery_urls: form.gallery_urls.filter(url => url && typeof url === 'string' && url.trim() !== '')
    }

    console.log('DEBUG - Form Data:', JSON.parse(JSON.stringify(form)))
    console.log('DEBUG - Final Payload:', payload)

    // 2. Save Project (Update or Create)
    if (editingId.value) {
      await $api(`/projects/${editingId.value}`, {
        method: 'PATCH',
        body: payload
      })
    } else {
      await $api('/projects', {
        method: 'POST',
        body: payload
      })
    }

    showModal.value = false
    refresh()
  } catch (err: any) {
    alert(err.message || 'Failed to save project')
  } finally {
    saving.value = false
  }
}

const deleteProject = async (id: string) => {
  if (!confirm('Are you sure you want to delete this project?')) return
  try {
    await $api(`/projects/${id}`, { method: 'DELETE' })
    refresh()
  } catch (e: any) {
    alert(e.message || 'Failed to delete project')
  }
}
</script>
