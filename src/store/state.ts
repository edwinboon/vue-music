import { State } from '@/types/State'
import { Song } from '@/types/Song'
import { Howl } from 'howler'

export const state: State = {
  authModalShow: false,
  isLoggedIn: false,
  currentSong: {} as Song,
  song: {} as Howl,
  seek: '00:00',
  duration: '00:00',
  progress: '0%',
}