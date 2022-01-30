import { MutationTree } from 'vuex'
import { State } from '@/types/State'
import { Mutations, MutationType } from '@/types/Mutations'

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.ToggleAuthModal](state: State, payload: boolean) {
    state.authModalShow = payload
  }
}