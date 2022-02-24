<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong"
          type="button"
          class="
            z-50
            h-24
            w-24
            text-3xl
            bg-white
            text-black
            rounded-full
            focus:outline-none
          "
        >
          <i
            class="fas"
            :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song?.modified_name }}</div>
          <div>{{ song?.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ song?.comment_count }})</span>
          <i class="fa fa-comments float-right text-purple-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 mb-4"
            v-if="commentShowAlert"
            :class="commentAlertVariant"
          >
            {{ commentAlertMessage }}
          </div>
          <vee-form
            :validation-schema="commentSchema"
            @submit="addComment"
            v-if="isUserLoggedIn"
          >
            <vee-field
              as="textarea"
              name="comment"
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
                mb-4
              "
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-purple-600 block"
              :disabled="commentInSubmission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Comment sortinging -->
          <select
            v-model="sorting"
            class="
              block
              mt-4
              py-1.5
              px-3
              text-gray-800
              border border-gray-300
              transition
              duration-500
              focus:outline-none focus:border-black
              rounded
            "
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto" style="margin-bottom: 80px">
      <li
        class="p-6 bg-white border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.songId"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Song } from '@/types/Song'
import {
  commentsCollection,
  songsCollection,
  auth,
  firebase,
} from '@/includes/firebase'
import { CommentSchema } from '@/types/Schema'
import { Comment } from '@/types/Comment'
import { Store, useStore } from '@/store/index'
import { ActionTypes } from '@/types/Actions'

export default defineComponent({
  name: 'Song',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const song = ref<Song>()
    const comments = ref<Comment[]>([])
    const sorting = ref<string>('1')
    const store: Store = useStore()

    const commentInSubmission = ref<boolean>(false)
    const commentShowAlert = ref<boolean>(false)
    const commentAlertVariant = ref<string>('bg-purple-500')
    const commentAlertMessage = ref<string>('Commment is being submitted.')

    // watch
    watch(sorting, (newVal) => {
      if (newVal === route.query.sort) {
        return
      }
      router.push({
        query: {
          sort: newVal,
        },
      })
    })

    const commentSchema: CommentSchema = {
      comment: 'required|min:3',
    }

    const isUserLoggedIn = computed(() => store.state.isLoggedIn)
    const isPlaying = computed(() => store.getters.isPlaying)
    const sortedComments = computed(() => {
      return comments.value.slice().sort((a, b) => {
        if (sorting.value === '1') {
          return (
            new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
          )
        } else {
          return (
            new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
          )
        }
      })
    })

    const newSong = async () => {
      try {
        if (isPlaying.value) {
          await store.dispatch(ActionTypes.SetToggleSong)
        } else {
          await store.dispatch(ActionTypes.SetNewSong, song.value)
        }
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error)
        console.log(String(error))
      }
    }

    // todo fix any tupe for resetForm
    const addComment = async (
      values: CommentSchema,
      { resetForm }: any
    ): Promise<void> => {
      // reset default values
      commentInSubmission.value = true
      commentShowAlert.value = true
      commentAlertVariant.value = 'bg-purple-500'
      commentAlertMessage.value = 'Comment is being submitted.'

      const comment: Comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        songId: route.params.id as string,
        name: auth.currentUser?.displayName,
        uid: auth.currentUser?.uid,
      }
      try {
        await commentsCollection.add(comment)
      } catch (error: unknown) {
        commentInSubmission.value = false
        commentAlertVariant.value = 'bg-red-500'

        if (error instanceof Error) commentAlertMessage.value = error.message
        commentAlertMessage.value = String(error)

        return
      }

      // update comment_count (song could be null but should not)
      if (song.value) {
        song.value.comment_count += 1
        await songsCollection.doc(route.params.id as string).update({
          comment_count: song.value.comment_count,
        })
      }

      // get commmenst
      await getComments()

      commentInSubmission.value = false
      commentAlertVariant.value = 'bg-green-500'
      commentAlertMessage.value = 'Comment added.'

      // reset form
      resetForm()
    }

    const getComments = async () => {
      const snapshots = await commentsCollection
        .where('songId', '==', route.params.id)
        .get()

      // reset comments to prevent duplicate comments
      comments.value = []

      snapshots.forEach((document: firebase.firestore.DocumentData) => {
        comments.value.push({ ...document.data() })
      })
    }

    onMounted(async () => {
      const snapshot = await songsCollection
        .doc(route.params.id as string)
        .get() // this is allways a string and not a string[]

      if (!snapshot.exists) {
        return router.push({ name: '404' })
      }

      const document = snapshot.data()

      if (!document) {
        return router.push({ name: '404' })
      }

      const { sort } = route.query

      sorting.value = sort === '1' || sort === '2' ? sort : '1'

      song.value = {
        id: route.params.id as string,
        comment_count: document.comment_count,
        display_name: document.display_name,
        genre: document.genre,
        modified_name: document.modified_name,
        original_name: document.original_name,
        uid: document.uid,
        url: document.url,
      }

      await getComments()
    })

    return {
      addComment,
      comments,
      commentSchema,
      commentInSubmission,
      commentShowAlert,
      commentAlertVariant,
      commentAlertMessage,
      isPlaying,
      isUserLoggedIn,
      newSong,
      song,
      sorting,
      sortedComments,
    }
  },
})
</script>
