export const Icon = {
  beforeMount: (el: HTMLElement): string  => {
    return el.innerHTML += '<i class="fa fa-headphones-alt float-right text-purple-400 text-xl"></i>'
  }
}
