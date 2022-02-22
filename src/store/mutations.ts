import { MutationTree } from 'vuex'
import { State } from '@/types/State'
import { Song } from '@/types/Song'
import { Mutations, MutationsType } from '@/types/Mutations'

export const mutations: MutationTree<State> & Mutations = {
  [MutationsType.ToggleAuthModal](state: State, payload: boolean) {
    state.authModalShow = payload
  },
  [MutationsType.ToggleAuth](state: State, payload: boolean) {
    state.isLoggedIn = payload
  },
  [MutationsType.NewSong](state: State, payload: Song) {
    state.currentSong = payload
  }
}