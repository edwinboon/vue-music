import { State } from '@/types/State'

export enum MutationType {
  ToggleAuthModal = 'TOGGLE_AUTH_MODAL',
}

export type Mutations = {
  [MutationType.ToggleAuthModal](state: State, payload: boolean): void 
 }