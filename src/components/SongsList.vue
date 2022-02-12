<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="
          ml-1
          py-1
          px-2
          text-sm
          rounded
          text-white
          bg-purple-600
          float-right
        "
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div class="text-white text-center font-bold p-4 mb-4" v-if="showAlert" :class="variant">
        {{ message }}
      </div>
      <vee-form :validation-schema="songSchema" @submit="editSong">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="
              block
              w-full
              py-1.5
              px-3
              text-gray-800
              border border-gray-300
              transition
              duration-500
              focus:outline-none focus:border-black
              rounded
            "
            placeholder="Enter Song Title"
            :value="song.modified_name"
            @input="updateUnsavedFlag(true)"
          />
          <error-message class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="
              block
              w-full
              py-1.5
              px-3
              text-gray-800
              border border-gray-300
              transition
              duration-500
              focus:outline-none focus:border-black
              rounded
            "
            placeholder="Enter Genre"
            :value="song.genre"
            @input="updateUnsavedFlag(true)"
          />
          <error-message class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="inSubmission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = false"
          :disabled="inSubmission"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { songsCollection, storage } from "@/includes/firebase";
import { SongSchema } from "@/types/Schema";
import { Song } from "@/types/Song";

export default defineComponent({
  name: "SongsList",
  props: {
    /**
     * Song
     */
    song: {
      required: true,
      type: Object as PropType<Song>,
    },
    /**
     * updateSong
     */
    updateSong: {
      required: true,
      type: Function
    },
    /**
    * removeSong
    */
    removeSong: {
      required: true,
      type: Function
    },
    /**
     * updateUnsavedFlag
     */
    updateUnsavedFlag: {
      required: true,
      type: Function
    }
  },
  setup(ctx) {
    const showForm = ref<boolean>(false);
    const inSubmission = ref<boolean>(false);
    const showAlert = ref<boolean>(false)
    const variant = ref<string>('bg-purple-500')
    const message = ref<string>('Updating song ...')

    // schema for song validation
    const songSchema: SongSchema = {
      modified_name: "required",
      genre: "alphaSpaces",
    };

    const editSong = async (values: SongSchema): Promise<void> => {
      inSubmission.value = true
      showAlert.value = true
      // reset values
      variant.value = 'bg-purple-500'
      message.value = 'Updating song ...'

      // update song
      try {
        await songsCollection.doc(ctx.song.id).update(values)
      } catch (error: unknown) {
        inSubmission.value = false
        variant.value = 'bg-red-500'

        if (error instanceof Error) message.value = error.message
        message.value = String(error)
          
        return
      }

      ctx.updateSong(ctx.song.id, values)
      ctx.updateUnsavedFlag(false)

      inSubmission.value = false
      variant.value = 'bg-green-500'
      message.value = 'Song has been updated successfully updated'
    };

    const deleteSong = async () => {
      // delete song from storage
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${ctx.song.original_name}`)
      await songRef.delete()

      // delete song from db
      await songsCollection.doc(ctx.song.id).delete()

      // remove song from the upload array
      ctx.removeSong(ctx.song.id)
    }

    return { 
      showForm, 
      songSchema,
      editSong, 
      deleteSong,
      inSubmission, 
      showAlert, 
      variant, 
      message
    };
  },
});
</script>
