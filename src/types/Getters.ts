import { State } from './State'

export type Getters = {
  authModalShow(state: State): boolean,
  isPlaying(state: State): boolean,
}