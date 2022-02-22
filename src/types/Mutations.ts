import { State } from '@/types/State'
import { Song } from '@/types/Song'

export enum MutationsType {
  ToggleAuthModal = 'TOGGLE_AUTH_MODAL',
  ToggleAuth = 'TOGGLE_AUTH',
  NewSong = 'NEW_SONG',
}

export type Mutations = {
  [MutationsType.ToggleAuthModal](state: State, payload: boolean): void 
  [MutationsType.ToggleAuth](state: State, payload: boolean): void
  [MutationsType.NewSong](state: State, payload: Song): void
 }