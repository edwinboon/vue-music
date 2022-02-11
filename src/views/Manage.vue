<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-purple-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <songs-list v-for="song in songs" :key="song.id" :song="song"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { auth, songsCollection } from "@/includes/firebase";
import { Song } from '@/types/Song'
import { firebase } from '@/includes/firebase'
import Upload from "@/components/Upload.vue";
import SongsList from '@/components/SongsList.vue'

export default defineComponent({
  name: "Manage",
  components: {
    Upload,
    SongsList,
  },
  setup() {
    const songs = ref<Song[]>([]);

    onMounted(async () => {
      try {
        const snapshot = await songsCollection
          .where("uid", "==", auth?.currentUser?.uid)
          .get();

        snapshot.forEach((document: firebase.firestore.DocumentData) => {
          const song: Song = {
            ...document.data(),
            id: document.id

          };

          songs.value.push(song)
        });
      } catch (error) {
        console.log(error);
      }
    });

    return { songs };
  },
});
</script>
