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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="pending" class="text-center">
            <td colspan="4" class="px-6 py-4 text-sm text-gray-500">Loading projects...</td>
          </tr>
          <tr v-else-if="projects.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No projects found.</td>
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
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                :class="project.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                {{ project.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(project.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-900 ml-3">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Modal (Simplified) -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveProject">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Create New Project</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Title</label>
                  <input v-model="form.title" required type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea v-model="form.description" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
                  <input v-model="form.tech_stack" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Project URL</label>
                  <input v-model="form.project_url" type="url" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <select v-model="form.status" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Image Upload</label>
                  <input type="file" @change="handleFileUpload" accept="image/*" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" :disabled="saving" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                {{ saving ? 'Saving...' : 'Save' }}
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
definePageMeta({ layout: 'admin' })

const $api = useApi()

const { data: projects, pending, refresh } = useAsyncData('admin-projects', 
  () => $api('/projects'), { default: () => [] }
)

const showModal = ref(false)
const saving = ref(false)
const fileInput = ref<File | null>(null)

const form = reactive({
  title: '',
  description: '',
  tech_stack: '',
  project_url: '',
  status: 'published',
  image_url: ''
})

const openCreateModal = () => {
  form.title = ''
  form.description = ''
  form.tech_stack = ''
  form.project_url = ''
  form.status = 'published'
  form.image_url = ''
  fileInput.value = null
  showModal.value = true
}

const handleFileUpload = (e: any) => {
  fileInput.value = e.target.files[0]
}

const saveProject = async () => {
  saving.value = true
  try {
    let finalImageUrl = ''
    
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

    // 2. Save Project
    await $api('/projects', {
      method: 'POST',
      body: {
        ...form,
        image_url: finalImageUrl || undefined
      }
    })
    
    showModal.value = false
    refresh()
  } catch (err) {
    alert('Failed to save project')
  } finally {
    saving.value = false
  }
}

const deleteProject = async (id: string) => {
  if(!confirm('Are you sure?')) return
  try {
    await $api(`/projects/${id}`, { method: 'DELETE' })
    refresh()
  } catch(e) {
    alert('Failed to delete')
  }
}
</script>
