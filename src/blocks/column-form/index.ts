
import ColumnForm from './components/main.vue'

(ColumnForm as any).install = (Vue: any) => {
  Vue.component(ColumnForm.name, ColumnForm)
}

export default ColumnForm
