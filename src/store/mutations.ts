import { MutationTree } from 'vuex'
import { State } from '@/types/State'
import { Mutations, MutationsType } from '@/types/Mutations'

export const mutations: MutationTree<State> & Mutations = {
  [MutationsType.ToggleAuthModal](state: State, payload: boolean) {
    state.authModalShow = payload
  },
  [MutationsType.ToggleAuth](state: State, payload: boolean) {
    state.isLoggedIn = payload
  }
}