import { State } from '@/types/State'

export enum MutationsType {
  ToggleAuthModal = 'TOGGLE_AUTH_MODAL',
  ToggleAuth = 'TOGGLE_AUTH',
}

export type Mutations = {
  [MutationsType.ToggleAuthModal](state: State, payload: boolean): void 
  [MutationsType.ToggleAuth](state: State, payload: boolean): void
 }