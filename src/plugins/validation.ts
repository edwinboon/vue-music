import { App, Plugin} from 'vue'
import { Field as VeeField, Form as VeeForm, defineRule, ErrorMessage } from 'vee-validate'
import { required, min, max, alpha_spaces as alphaSpaces, email, confirmed } from '@vee-validate/rules'

export const VeeValidatePlugin: Plugin = {
    install: (app: App): void => {
      // register components
      app.component('VeeField', VeeField)
      app.component('VeeForm', VeeForm)
      app.component('ErrorMessage', ErrorMessage)
      
      // define rules
      defineRule('required', required)
      defineRule('min', min)
      defineRule('max', max)
      defineRule('alphaSpaces', alphaSpaces)
      defineRule('email', email)
      defineRule('confirmed', confirmed)
    }
}
