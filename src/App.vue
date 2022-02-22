<template>
  <app-header />

  <router-view />

  <audio-player />

  <auth-modal />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/Header.vue'
import AuthModal from '@/components/Auth.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import { useStore } from '@/store/index'
import { ActionTypes } from './types/Actions'

export default defineComponent({
  name: 'MyApp',
  components: {
    AppHeader,
    AuthModal,
    AudioPlayer,
  },
  setup() {
    const store = useStore()

    // init login
    store.dispatch(ActionTypes.InitLogin)
  },
})
</script>
