import { ActionContext } from 'vuex'
import { Mutations } from './mutations'
import { LoginSchema, RegistrationSchema } from './Schema'
import { Song } from '../types/Song'
import { State } from './state'
 
export enum ActionTypes {
  SetRegistration = 'SET_REGISTRATION',
  InitLogin = 'INIT_LOGIN',
  SetLogin = 'SET_LOGIN',
  SetSignOut = 'SET_SIGN_OUT',
  SetNewSong = 'SET_NEW_SONG',
  SetToggleSong = 'SET_TOGGLE_SONG',
  SetProgress = 'SET_PROGRESS'
}


type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.SetRegistration](context: ActionAugments, payload: RegistrationSchema): void
  [ActionTypes.InitLogin](context: ActionAugments): void
  [ActionTypes.SetLogin](context: ActionAugments, payload: LoginSchema): void
  [ActionTypes.SetSignOut](context: ActionAugments): void
  [ActionTypes.SetNewSong](context: ActionAugments, payload: Song): void
  [ActionTypes.SetToggleSong](context: ActionAugments): void
  [ActionTypes.SetProgress](context: ActionAugments): void
}