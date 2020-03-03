
import FunnelFilter from './components/main.vue'

(FunnelFilter as any).install = (Vue: any) => {
  Vue.component(FunnelFilter.name, FunnelFilter)
}

export default FunnelFilter
