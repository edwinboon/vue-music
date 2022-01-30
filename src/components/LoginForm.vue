<template>
  <div
    v-if="loginShowAlert"
    class="text-white text-center font-bold p-5 mb-4"
    :class="loginAlertVariation"
  >
    {{ loginAlertMessage }}
  </div>
  <vee-form
    :validation-schema="loginSchema"
    @submit="login"
  >
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
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
      <vee-field
        type="password"
        name="password"
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
      />
      <error-message class="text-red-600" name="password" />
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
      :disabled="loginInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { LoginSchema } from '@/types/Schema'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    // vars for login alert
    const loginInSubmission = ref<boolean>(false)
    const loginShowAlert = ref<boolean>(false)
    const loginAlertVariation = ref<string>('bg-blue-500')
    const loginAlertMessage = ref<string>('loggin in...')

    // schema for login validation
    const loginSchema: LoginSchema = {
      email: "required|min:3|max:100|email",
      password: "required|min:8|max:32",
    }

    const login = (values: LoginSchema): void => {
      loginInSubmission.value = true
      loginShowAlert.value = true
      // reset values to default
      loginAlertVariation.value = 'bg-blue-500'
      loginAlertMessage.value = 'Loggin in...'

      // dummy response for now
      loginAlertVariation.value = 'bg-green-500'
      loginAlertMessage.value = 'Your have been successfully logged in.'
      console.log({values})
    }

    return { loginSchema, login, loginInSubmission, loginShowAlert, loginAlertVariation, loginAlertMessage }
  }
})

</script>
