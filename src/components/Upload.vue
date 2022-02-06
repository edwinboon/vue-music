<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="
          w-full
          px-10
          py-20
          rounded
          text-center
          cursor-pointer
          border border-dashed border-gray-400
          text-gray-400
          transition
          duration-500
          hover:text-white
          hover:bg-green-400
          hover:border-green-400
          hover:border-solid
        "
        :class="{ 'bg-green-400 border-green-400 broder-solid': isDragOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragOver = false"
        @dragover.prevent.stop="isDragOver = true"
        @dragenter.prevent.stop="isDragOver = true"
        @dragleave.prevent.stop="isDragOver = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.textClass">
          <i :class="upload.icon"/> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: `${upload.currentProgress}%`}"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { storage, auth, songsCollection } from '@/includes/firebase'

export default defineComponent({
  name: "Upload",
  setup() {
    const isDragOver = ref<boolean>(false)
    const uploads = ref<Record<string, unknown>[]>([])
    
    // upload to firebase
    const upload = (event: DragEvent): void => {
      isDragOver.value = false

      // check if there is a dataTransfer object
      if(event && event.dataTransfer) {
        const filesObject = event.dataTransfer.files
        // convert object to array of objects
        const files: File[] = Object.keys(filesObject).map((_, index) => {
          return filesObject[index]
        })

        files.forEach((file: File) => {
          if(file.type !== 'audio/mpeg') {
            return 
          }

          // create ref to where to store
          const storageRef = storage.ref()
          const songsRef = storageRef.child(`songs/${file.name}`)

          // upload the file
          const task = songsRef.put(file)

          // get index and fill uploads array
          const uploadIndex = uploads.value.push({
            task,
            currentProgress: 0,
            name: file.name,
            variant: 'bg-purple-400',
            icon: 'fas fa-spinner fa-spin', 
            textClass: '',
          }) - 1

          // listen to events
          task.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            uploads.value[uploadIndex].currentProgress = progress

          }, () => {
            uploads.value[uploadIndex].variant = 'bg-red-400'
            uploads.value[uploadIndex].icon = 'fas fa-times'
            uploads.value[uploadIndex].textClass = 'text-red-400'
          }, async () => {
            // store data in the database
            const song = {
              uid: auth.currentUser?.uid,
              display_name: auth.currentUser?.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0,
              url: await task.snapshot.ref.getDownloadURL()
            }

            await songsCollection.add(song)

            uploads.value[uploadIndex].variant = 'bg-green-400'
            uploads.value[uploadIndex].icon = 'fas fa-check'
            uploads.value[uploadIndex].textClass = 'text-green-400'
          })
        })
      }

      return
    }

    return { isDragOver, upload, uploads}
  }
});
</script>
