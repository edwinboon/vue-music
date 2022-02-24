import { ActionTree } from 'vuex'
import { State } from '@/types/State'
import { Actions, ActionTypes } from '@/types/Actions'
import { MutationsType } from '@/types/Mutations'
import { auth, usersCollection, } from '@/includes/firebase'
import { Howl } from 'howler'

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
  },
  async [ActionTypes.SetNewSong]({ commit, state, dispatch }, payload) {
    if(state.song instanceof Howl) {
      state.song.unload()
    }

    commit(MutationsType.NewSong, payload)
    state.song.play()

    // listen to events
    state.song.on('play', () => {
      requestAnimationFrame(() => {
        dispatch(ActionTypes.SetProgress)
      })
    })
  },
  async [ActionTypes.SetToggleSong]({ state }) {
    if(!state.song.playing) {
      return
    }

    if(state.song.playing()) {
      state.song.pause()
    } else {
      state.song.play()
    }
  },
  async [ActionTypes.SetProgress]({ commit, state, dispatch }) {
    commit(MutationsType.UpdatePosition, undefined)

    if(state.song.playing()) {
      requestAnimationFrame(() => {
        dispatch(ActionTypes.SetProgress)
      })
    }
  },
  async [ActionTypes.SetUpdateSeek]({state, dispatch }, payload) {
    if(!state.song.playing) {
      return
    }

    const { x, width } = payload.currentTarget.getBoundingClientRect();
    const clickX = payload.clientX - x
    const percentage = clickX / width
    const seconds = state.song.duration() * percentage

    state.song.seek(seconds)

    state.song.once('seek', () => {
      dispatch(ActionTypes.SetProgress)
    })
  }
}