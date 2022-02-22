import { Song } from '@/types/Song'

export type State = {
  authModalShow: boolean,
  isLoggedIn: boolean,
  currentSong: Song
}