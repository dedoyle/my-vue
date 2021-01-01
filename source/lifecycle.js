import MyVue from '.'
import { compiler } from './compiler'
import Watcher from './observe/watcher'
// import { createEmptyVNode } from './vnode'

MyVue.prototype._update = function () {
  const vm = this
  let el = vm.$el
  console.log('_update 挂载到 dom')
  // 1. 获取 dom 树
  let node = document.createDocumentFragment()
  let firstChild
  while ((firstChild = el.firstChild)) {
    node.appendChild(firstChild)
  }
  // 2. 替换 dom 树中的数据
  compiler(node, vm)

  // 3. 挂载新的 node
  el.appendChild(node)
}

export function mountComponent(vm, el) {
  console.log('mountComponent vm el')
  vm.$el = el
  
  let updateComponent = () => {
    vm._update()
  }

  // 一个组件对应一个 watcher
  new Watcher(vm, updateComponent)

  return vm
}
