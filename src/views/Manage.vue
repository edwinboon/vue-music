<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload :addSong="addSong" />
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
            <songs-list
              v-for="song in songs"
              :key="song.id"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { auth, songsCollection } from '@/includes/firebase';
import { Song } from '@/types/Song';
import { firebase } from '@/includes/firebase';
import { SongSchema } from '@/types/Schema';
import Upload from '@/components/Upload.vue';
import SongsList from '@/components/SongsList.vue';

export default defineComponent({
  name: 'Manage',
  components: {
    Upload,
    SongsList,
  },
  setup() {
    const songs = ref<Song[]>([]);
    const unsavedFlag = ref<boolean>(false)

    onMounted(async () => {
      try {
        const snapshot = await songsCollection
          .where('uid', '==', auth?.currentUser?.uid)
          .get();

        snapshot.forEach((document: firebase.firestore.DocumentData) => {
          addSong(document);
        });
      } catch (error: unknown) {
        console.log(error);
      }
    });

    onBeforeRouteLeave((to, from, next) => {
      if(!unsavedFlag.value) {
        next()
      } else {
        const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
        next(leave)
      }
    }) 

    const updateSong = (id: string, values: SongSchema): void => {
      const songToUpdate = songs.value.find((song) => song.id === id);

      if (songToUpdate) {
        songToUpdate.modified_name = values.modified_name;
        songToUpdate.genre = values.genre;
      }
    };

    const removeSong = (id: string): void => {
      const songToDelete = songs.value.findIndex((song) => song.id === id);
      songs.value.splice(songToDelete, 1);
    };

    const addSong = (document: firebase.firestore.DocumentData): void => {
      const song: Song = {
        ...document.data(),
        id: document.id,
      };

      songs.value.push(song);
    };

    const updateUnsavedFlag = (value: boolean) => unsavedFlag.value = value

    return { songs, updateSong, removeSong, addSong, updateUnsavedFlag };
  },
});
</script>
