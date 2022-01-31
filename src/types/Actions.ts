import { ActionContext } from 'vuex'
import { Mutations } from './mutations'
import { RegistrationSchema } from './Schema'
import { State } from './state'
 
export enum ActionTypes {
  SetRegistration = 'SET_REGISTRATION',
}


type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.SetRegistration](context: ActionAugments, payload: RegistrationSchema): void
}