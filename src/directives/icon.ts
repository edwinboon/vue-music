import { DirectiveBinding } from "vue"

export const Icon = {
  beforeMount: (el: HTMLElement, binding: DirectiveBinding<string>): string  => {
    const iconClass = `fa fa-${binding.value} float-right text-purple-400 text-xl`
    return el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
