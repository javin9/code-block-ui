
import BasicForm from './components/main.vue'

(BasicForm as any).install = (Vue: any) => {
  Vue.component(BasicForm.name, BasicForm)
}

export default BasicForm
