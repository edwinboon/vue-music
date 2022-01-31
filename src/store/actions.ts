import { ActionTree } from 'vuex'
import { State } from '@/types/State'
import { Actions, ActionTypes } from '@/types/Actions'
import { MutationsType } from '@/types/Mutations'
import { auth, usersCollection, } from '@/includes/firebase'

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetRegistration]({ commit, state }, payload) {
    await auth.createUserWithEmailAndPassword(payload.email, payload.password)

    await usersCollection.add({
      name: payload.name,
      email: payload.email
    })

    commit(MutationsType.ToggleAuth, !state.isLoggedIn)
  }
}