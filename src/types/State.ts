import { Song } from '@/types/Song'
import { Howl } from 'howler'

export type State = {
  authModalShow: boolean,
  isLoggedIn: boolean,
  currentSong: Song,
  song: Howl,
  seek: string,
  duration: string
  progress: string
}