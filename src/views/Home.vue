<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200" v-icon="'headphones-alt'">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <v-icon />
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.id" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { songsCollection, firebase } from '@/includes/firebase'
import { Song } from '@/types/Song'
import SongItem from '@/components/SongItem.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SongItem,
  },
  setup() {
    const songs = ref<Song[]>([])
    const pendingRequest = ref(false)
    const maxPerPage = 25

    const getSongs = async () => {
      if (pendingRequest.value) {
        return
      }

      pendingRequest.value = true

      let snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

      if (songs.value.length) {
        // get last document
        const lastItem = songs.value.slice(-1)[0]
        const lastDocument = await songsCollection.doc(lastItem.id).get()

        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDocument)
          .limit(maxPerPage)
          .get()
      } else {
        snapshots = await songsCollection
          .orderBy('modified_name')
          .limit(maxPerPage)
          .get()
      }

      snapshots.forEach((document: firebase.firestore.DocumentData) => {
        songs.value.push({ ...document.data(), id: document.id })
      })

      pendingRequest.value = false
    }
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window

      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        getSongs()
      }
    }

    // get songs
    onMounted(async () => {
      getSongs()

      // get scroll posistion
      window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { songs }
  },
})
</script>

