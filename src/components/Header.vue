<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link :to="{ name: 'Home' }" exact-active-class="no-active" class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</router-link>

      <div class="flex flex-grow items-center justify-end">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!isUserLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{name: 'Manage' }">
                Manage
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">
                Logout
              </a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from '@/store/index'
import { MutationsType } from '@/types/Mutations'
import { ActionTypes } from "@/types/Actions";
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // update state
    const toggleAuthModal = (): void => {
      store.commit(MutationsType.ToggleAuthModal, !store.state.authModalShow)
    }

    const isUserLoggedIn = computed(() => store.state.isLoggedIn)

    const signOut = (): void => {
      store.dispatch(ActionTypes.SetSignOut)

      if(route.meta.value.requiresAuth) {
        router.push({ name: 'Home' })
      }
    }

    return { isUserLoggedIn, toggleAuthModal, signOut }
  }
});
</script>
