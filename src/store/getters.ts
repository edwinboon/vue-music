import { GetterTree } from 'vuex'
import { State } from '@/types/State'
import { Getters } from '@/types/Getters'

export const getters: GetterTree<State, State> & Getters = {
  authModalShow(state: State) {
    return state.authModalShow
  },
  isPlaying(state: State) {
    return !state.song.playing ? false : state.song.playing()
  }
}