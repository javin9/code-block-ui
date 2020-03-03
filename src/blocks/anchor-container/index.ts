
import AnchorContainer from './components/main.vue'
import AnchorItem from './components/anchor-item.vue'

(AnchorContainer as any).install = (Vue: any) => {
  Vue.component(AnchorContainer.name, AnchorContainer)
  Vue.component(AnchorItem.name, AnchorItem)
}

export default {
  AnchorContainer,
  AnchorItem
}
