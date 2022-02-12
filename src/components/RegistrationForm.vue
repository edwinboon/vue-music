<template>
  <div
    v-if="regShowAlert"
    class="text-white text-center font-bold p-5 mb-4"
    :class="regAlertVariation"
  >
    {{ regAlertMessage }}
  </div>
  <vee-form
    :validation-schema="registrationSchema"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        placeholder="Enter Name"
      />
      <error-message class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" #default="{ field, errors }">
        <input
          type="password"
          class="
            block
            w-full
            py-1.5
            px-3
            text-gray-800
            border border-gray-300
            transition
            duration-500
            focus:outline-none focus:border-black
            rounded
          "
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        placeholder="Confirm Password"
      />
      <error-message class="text-red-600" name="confirm_password" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <br />
      <error-message class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="
        block
        w-full
        bg-purple-600
        text-white
        py-1.5
        px-3
        rounded
        transition
        hover:bg-purple-700
      "
      :disabled="regInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RegistrationSchema } from '@/types/Schema'
import { useStore } from '@/store/index'
import { ActionTypes } from '@/types/Actions'
import { MutationsType } from '@/types/Mutations'

export default defineComponent({
  name: 'RegistrationForm',
  setup() {
    const store = useStore()
    // vars for reg alert
    const regInSubmission = ref<boolean>(false)
    const regShowAlert = ref<boolean>(false)
    const regAlertVariation = ref<string>('bg-purple-500')
    const regAlertMessage = ref<string>('Account being created...')

    // schema for register validation
    const registrationSchema: RegistrationSchema = {
      name: "required|min:3|max:50|alphaSpaces",
      email: "required|min:3|max:100|email",
      password: "required|min:8|max:32",
      confirm_password: "confirmed:@password",
      tos: "required",
    };

    const register = async (values: RegistrationSchema): Promise<void> => {
      regInSubmission.value = true
      regShowAlert.value = true
      // reset values to default
      regAlertVariation.value = 'bg-purple-500'
      regAlertMessage.value = 'Account being created...'

      try {
        await store.dispatch(ActionTypes.SetRegistration, values)
      } catch (error: unknown) {
          regInSubmission.value = false
          regAlertVariation.value = 'bg-red-500'

          if (error instanceof Error) regAlertMessage.value = error.message
          regAlertMessage.value = String(error)
          
          return
      }

      // dummy response for now
      regAlertVariation.value = 'bg-green-500'
      regAlertMessage.value = 'Your account has been created.'

      // close modal
      store.commit(MutationsType.ToggleAuthModal, !store.state.authModalShow)
    };

    return { 
      regInSubmission,
      regShowAlert,
      regAlertVariation,
      regAlertMessage,
      registrationSchema,
      register 
    }
  }
})

</script>

