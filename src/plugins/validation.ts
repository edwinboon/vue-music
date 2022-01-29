import { App, Plugin} from 'vue'
import { Field as VeeField, Form as VeeForm, defineRule, ErrorMessage, configure } from 'vee-validate'
import { required, min, max, alpha_spaces as alphaSpaces, email, confirmed } from '@vee-validate/rules'

export const VeeValidatePlugin: Plugin = {
    install: (app: App): void => {
      // register components
      app.component('VeeField', VeeField)
      app.component('VeeForm', VeeForm)
      app.component('ErrorMessage', ErrorMessage)
      
      // define rules
      defineRule('required', required)
      defineRule('tos', required) // copy of required but this way we can show a different error msg
      defineRule('min', min)
      defineRule('max', max)
      defineRule('alphaSpaces', alphaSpaces)
      defineRule('email', email)
      defineRule('confirmed', confirmed)

      // configure custom messages
      configure({
        generateMessage: (ctx): string => { 
          /**
           * Don't use `object` as a type. The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).
           * Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.
           */
           const messages: Record<string, string> = {
            required: `${ctx.field} is required.`,
            tos: `You must accept the terms of service.`,
            min: `${ctx.field} is to short.`,
            max: `${ctx.field} is to long.`,
            alphaSpaces: `${ctx.field} may only contain alphabetical characters and spaces.`,
            email: `${ctx.field} is not a valid email.`,
            confirmed: `The passwords don't match.`
          }

          
          if (ctx.rule && ctx.rule.name) {
            return messages[ctx.rule.name]
          } else {
            return `${ctx.field} is invalid`
          }
        },
      })
    }
}
