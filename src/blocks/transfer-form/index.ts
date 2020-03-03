
import TransferForm from './components/main.vue'

(TransferForm as any).install = (Vue: any) => {
  Vue.component(TransferForm.name, TransferForm)
}

export default TransferForm
