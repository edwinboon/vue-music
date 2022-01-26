import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationType {
  ToggleAuthModal = 'TOGGLE_AUTH_MODAL',
}

export type Mutations = {
 [MutationType.ToggleAuthModal](state: State, payload: boolean): void 
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.ToggleAuthModal](state: State, payload: boolean) {
    state.authModalShow = payload
  }
}