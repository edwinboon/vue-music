import { State } from '@/types/State'

export enum MutationType {
  ToggleAuthModal = 'TOGGLE_AUTH_MODAL',
  AddUserName = 'ADD_USER_NAME',
}

export type Mutations = {
  [MutationType.ToggleAuthModal](state: State, payload: boolean): void 
 }