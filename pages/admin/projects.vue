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

                <!-- Gallery Management -->
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <label class="block text-sm font-medium text-gray-700">Gallery Images</label>
                    <button type="button" @click="galleryInput?.click()" class="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 font-semibold transition-colors">
                      + Add Images
                    </button>
                    <input 
                      ref="galleryInput" 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      class="hidden" 
                      @change="handleGalleryUpload"
                    >
                  </div>
                  
                  <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    <!-- Existing Gallery Images -->
                    <div v-for="(url, index) in form.gallery_urls" :key="'existing-' + index" class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      <img :src="url" class="w-full h-full object-cover" />
                      <button @click="removeExistingGalleryImage(index)" type="button" class="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>

                    <!-- New Upload Previews -->
                    <div v-for="(file, index) in newGalleryImages" :key="'new-' + index" class="relative group aspect-square rounded-lg overflow-hidden border border-indigo-200 bg-indigo-50">
                      <img :src="file.preview" class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button @click="removeNewGalleryImage(index)" type="button" class="p-1.5 bg-red-500 text-white rounded-full shadow-lg">
                           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                         </button>
                      </div>
                      <div class="absolute bottom-0 left-0 right-0 py-0.5 bg-indigo-600 text-[8px] text-white text-center font-bold uppercase tracking-tighter">New</div>
                    </div>

                    <!-- Empty State / Placeholder -->
                    <div v-if="form.gallery_urls.length === 0 && newGalleryImages.length === 0" class="col-span-full py-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      <span class="text-xs">No images in gallery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" :disabled="saving" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2.5 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                {{ saving ? (uploadProgress || 'Saving...') : (editingId ? 'Update' : 'Save') }}
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
const uploadProgress = ref('')
const editingId = ref<string | null>(null)
const fileInput = ref<File | null>(null)
const galleryInput = ref<HTMLInputElement | null>(null)

interface GalleryFile {
  file: File
  preview: string
}
const newGalleryImages = ref<GalleryFile[]>([])

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
  newGalleryImages.value = []
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
  newGalleryImages.value = []
  showModal.value = true
}

const handleGalleryUpload = (e: any) => {
  const files = Array.from(e.target.files) as File[]
  const MAX_SIZE = 4 * 1024 * 1024 // 4MB (Vercel limit is 4.5MB)
  
  const oversized = files.filter(f => f.size > MAX_SIZE)
  if (oversized.length > 0) {
    alert(`The following files are too large (max 4MB for Vercel compatibility):\n${oversized.map(f => f.name).join(', ')}`)
    if (galleryInput.value) galleryInput.value.value = ''
    return
  }

  files.forEach(file => {
    newGalleryImages.value.push({
      file,
      preview: URL.createObjectURL(file)
    })
  })
  if (galleryInput.value) galleryInput.value.value = ''
}

const removeExistingGalleryImage = (index: number) => {
  form.gallery_urls.splice(index, 1)
}

const removeNewGalleryImage = (index: number) => {
  const removed = newGalleryImages.value.splice(index, 1)[0]
  URL.revokeObjectURL(removed.preview)
}

const handleFileUpload = (e: any) => {
  const file = e.target.files[0]
  if (file && file.size > 4 * 1024 * 1024) {
    alert('Main thumbnail must be less than 4MB (Vercel limit)')
    e.target.value = ''
    return
  }
  fileInput.value = file
}

const saveProject = async () => {
  saving.value = true
  try {
    let finalImageUrl = form.image_url

    // 1. Upload thumbnail if exists
    if (fileInput.value) {
      uploadProgress.value = 'Uploading thumbnail...'
      const formData = new FormData()
      formData.append('file', fileInput.value)

      const uploadRes: any = await $api('/projects/upload', {
        method: 'POST',
        body: formData
      })
      finalImageUrl = uploadRes.url
    }

    // 2. Upload new gallery images SEQUIENTIALLY to avoid 503 errors
    const uploadedGalleryUrls = [...form.gallery_urls]
    if (newGalleryImages.value.length > 0) {
      for (let i = 0; i < newGalleryImages.value.length; i++) {
        const item = newGalleryImages.value[i]
        uploadProgress.value = `Uploading gallery ${i + 1}/${newGalleryImages.value.length}...`
        
        const formData = new FormData()
        formData.append('file', item.file)
        
        const res: any = await $api('/projects/upload', {
          method: 'POST',
          body: formData
        })
        uploadedGalleryUrls.push(res.url)
      }
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
      gallery_urls: uploadedGalleryUrls
    }

    // 3. Save Project (Update or Create)
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

    // Cleanup previews
    newGalleryImages.value.forEach(item => URL.revokeObjectURL(item.preview))
    
    showModal.value = false
    refresh()
  } catch (err: any) {
    console.error('Save project error:', err)
    if (err.message?.includes('Failed to fetch')) {
      alert('Upload failed: The file might be too large (>4MB) or the server took too long to respond. Try using a smaller/compressed image.')
    } else {
      alert(err.message || 'Failed to save project')
    }
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
