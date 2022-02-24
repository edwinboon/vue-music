 <template>
  <!-- Player -->
  <div
    class="
      fixed
      bottom-0
      left-0
      bg-white
      p-5
      pb-4
      text-left
      align-top
      w-full
      h-16
    "
  >
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button type="button" @click.prevent="toggleSong">
          <i
            class="fa text-gray-500 text-xl"
            :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"
          ></i>
        </button>
      </div>
      <!-- Current Position -->
      <div
        class="
          float-left
          w-7
          h-7
          leading-3
          text-gray-400
          mt-0
          text-lg
          w-14
          ml-5
          mt-1
        "
      >
        <span class="player-currenttime">{{ seek }}</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div
          v-if="currentSong.modified_name"
          class="
            absolute
            left-0
            right-0
            text-lg text-center
            mx-auto
            player-song-info
          "
        >
          <span class="song-title">{{ currentSong.modified_name }}</span> by
          <span class="song-artist">{{ currentSong.display_name }}</span>
        </div>
        <!-- Scrub Container  -->
        <span
          @click.prevent="updateSeek"
          class="
            block
            w-full
            h-2
            rounded
            m-1
            mt-2
            bg-gray-200
            relative
            cursor-pointer
          "
        >
          <!-- Player Ball -->
          <span
            class="absolute top-neg-8 text-gray-800 text-lg"
            :style="{ left: progress }"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="
              block
              h-2
              rounded
              bg-gradient-to-r
              from-purple-500
              to-purple-400
            "
            :style="{ width: progress }"
          ></span>
        </span>
      </div>
      <!-- Duration -->
      <div
        class="
          float-left
          w-7
          h-7
          leading-3
          text-gray-400
          mt-0
          text-lg
          w-14
          ml-8
          mt-1
        "
      >
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from '@/types/Actions'

export default defineComponent({
  name: 'AudioPlayer',
  setup() {
    const store = useStore()
    const seek = computed(() => store.state.seek)
    const duration = computed(() => store.state.duration)
    const progress = computed(() => store.state.progress)
    const currentSong = computed(() => store.state.currentSong)

    const toggleSong = async () => {
      try {
        await store.dispatch(ActionTypes.SetToggleSong)
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error)
        console.log(String(error))
      }
    }

    const updateSeek = async ($event: Event) => {
      try {
        await store.dispatch(ActionTypes.SetUpdateSeek, $event)
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error)
        console.log(String(error))
      }
    }

    const isPlaying = computed(() => store.getters.isPlaying)

    return {
      currentSong,
      duration,
      isPlaying,
      progress,
      seek,
      toggleSong,
      updateSeek,
    }
  },
})
</script>
