import { observe } from './Observe'
import { isPlainObject, noop } from './util'

export default class MyVue {
  constructor(options) {
    if (!(this instanceof MyVue)) {
      return new MyVue()
    }
    this._init(options)
  }
  _init(options) {
    let vm = this

    // vue 的可读属性都是以 $ 开头
    vm.$options = options

    // MVVM原理 重新初始化数据  data
    initState(vm)
  }
}

export function initState(vm) {
  let opt = vm.$options
  if (opt.data) {
    initData(vm)
  }
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  if (!isPlainObject(data)) {
    data = {}
    console.log('data functions should return an object')
  }

  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    // todo 检查是否和 methods 重名
    // todo 检查是否和 props 重名

    // 代理 vm 的 _data 上的属性到 vm
    proxy(vm, '_data', key)
  }
  observe(data)
}

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxyGetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
