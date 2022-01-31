import { ActionTree } from 'vuex'
import { State } from '@/types/State'
import { Actions, ActionTypes } from '@/types/Actions'
import { MutationsType } from '@/types/Mutations'
import { auth, usersCollection, } from '@/includes/firebase'
import { store } from '.'
import { state } from './state'

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetRegistration]({ commit, state }, payload) {
    
    // create user
    const userCred = await auth.createUserWithEmailAndPassword(payload.email, payload.password)

    // add user  to the user collection
    await usersCollection.doc(userCred?.user?.uid).set({
      name: payload.name,
      email: payload.email
    })

    // update user profile
    await userCred.user?.updateProfile({
      displayName: payload.name
    })

    commit(MutationsType.ToggleAuth, !state.isLoggedIn)
  },
  [ActionTypes.InitLogin]({ commit }) {
    // get login state
    const user = auth.currentUser

    // commit mutation
    if (user) {
      commit(MutationsType.ToggleAuth, true)
    }
  },
  async [ActionTypes.SetLogin]({ commit, state }, payload) {
    await auth.signInWithEmailAndPassword(payload.email, payload.password)

    commit(MutationsType.ToggleAuth, !state.isLoggedIn)
  },
  async [ActionTypes.SetSignOut]({ commit, state }) {
    await auth.signOut()

    commit(MutationsType.ToggleAuth, !state.isLoggedIn)
  }
}