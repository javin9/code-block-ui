
import Typesetting from './components/main.vue'

(Typesetting as any).install = (Vue: any) => {
  Vue.component(Typesetting.name, Typesetting)
}

export default Typesetting
