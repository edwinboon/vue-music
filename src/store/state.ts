import { State } from '@/types/State'
import { Song } from '@/types/Song'

export const state: State = {
  authModalShow: false,
  isLoggedIn: false,
  currentSong: {} as Song
}