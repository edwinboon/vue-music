<template>
  <app-header />


  <router-view v-slot="{ Component }"> 
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

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

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>