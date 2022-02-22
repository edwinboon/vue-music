import { MutationTree } from 'vuex'
import { State } from '@/types/State'
import { Song } from '@/types/Song'
import { Mutations, MutationsType } from '@/types/Mutations'
import { Howl } from 'howler'
import { formatTime } from '@/includes/helper'

export const mutations: MutationTree<State> & Mutations = {
  [MutationsType.ToggleAuthModal](state: State, payload: boolean) {
    state.authModalShow = payload
  },
  [MutationsType.ToggleAuth](state: State, payload: boolean) {
    state.isLoggedIn = payload
  },
  [MutationsType.NewSong](state: State, payload: Song) {
    state.currentSong = payload
    state.song = new Howl({
      src: [payload.url],
      html5: true,  
    })
  },
  [MutationsType.UpdatePosition](state: State) {
    state.seek = formatTime(state.song.seek())
    state.duration = formatTime(state.song.duration())
    state.progress = `${(state.song.seek() / state.song.duration()) * 100}%`
  }
}