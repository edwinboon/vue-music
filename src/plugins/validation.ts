import { App, Plugin} from 'vue'
import { Field as VeeField, Form as VeeForm, defineRule, ErrorMessage } from 'vee-validate'
import { required } from '@vee-validate/rules'

export const VeeValidatePlugin: Plugin = {
    install: (app: App): void => {
      app.component('VeeField', VeeField)
      app.component('VeeForm', VeeForm)
      app.component('ErrorMessage', ErrorMessage)
      
      defineRule('required', required)
    }
}
