import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { State } from '@/types/State'
import { Mutations } from '@/types/Mutations'
import { Actions } from '@/types/Actions'
import { Getters } from '@/types/Getters'

export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
})

export function useStore(): Store {
  return store as Store
}

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}