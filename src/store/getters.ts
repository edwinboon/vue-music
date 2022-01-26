import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  authModalShow(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  authModalShow(state: State) {
    return state.authModalShow
  }
}