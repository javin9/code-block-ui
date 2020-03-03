/*
 * @Copyright: Copyright (c) 2019 Zybang, All rights reserved
 * @Name: TransferStore
 * @Description: 表单之间数据共享，模拟了vuex，实现公共数据池
 * @Author: liujianwei(liujianwei@zuoyebang.com)
 * @LastEditors: liujianwei
 * 1.更改states数据，需要commit一个mutations
 */

class TransferStore {
  // states 类似 vuex的states
  states: any = {
    showWay: '',
    value: '',
    label: '',
    dataList: [],
    selectedValue: [], // 已经选择的对象value属性数组
    previewList: [] // 已经选择的对象数组
  }

  constructor (tranfer: any, initialState: any) {
    if (!tranfer) {
      throw new Error('tranfer is required.')
    }

    for (const prop in initialState) {
      if (Object.prototype.hasOwnProperty.call(initialState, prop) &&
        Object.prototype.hasOwnProperty.call(this.states, prop)) {
        this.states[prop] = initialState[prop]
      }
    }
  }

  // vuex mutations
  mutations: any = {
    // 更新已选对象value数组
    updateSelected (states: any, selectedValue: any) {
      states.selectedValue = [...selectedValue]
    },
    // 更新预览对象数组
    updatePreviewList (states: any, previewList: any) {
      states.previewList = [...previewList]
    }
  }

  // vuex commit
  commit (name: any, ...args: any) {
    const mutations = this.mutations
    if (mutations[name]) {
      mutations[name].apply(this, [this.states].concat(args))
    } else {
      throw new Error(`Action not found: ${name}`)
    }
  }
}

export default TransferStore
