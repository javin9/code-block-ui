
import EditAddress from './components/main.vue'

(EditAddress as any).install = (Vue: any) => {
  Vue.component(EditAddress.name, EditAddress)
}

export default EditAddress
