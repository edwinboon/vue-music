import {
  createStore,
  Store as VuexStore,
  CommitOptions,
} from 'vuex'
import { State, state } from './state'
import { Mutations, mutations } from './mutations'
import { Getters, getters } from './getters'

export const store = createStore<State>({
  state,
  mutations,
  getters
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
}  & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}