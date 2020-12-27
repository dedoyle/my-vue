import { observe } from './observe'
import { isPlainObject, noop, query, warn } from './util'
import { mountComponent } from './lifecycle'

export default function MyVue(options) {
  if (!(this instanceof MyVue)) {
    return new MyVue()
  }
  this._init(options)
}

MyVue.prototype._init = function _init(options) {
  let vm = this

  // 避免被 observe
  vm._isVue = true

  // vue 的可读属性都是以 $ 开头
  vm.$options = options

  // MVVM原理 重新初始化数据  data
  initState(vm)

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

MyVue.prototype.$mount = function $mount(el) {
  let vm = this
  el = el && query(el)
  return mountComponent(vm, el)
}

// 如果检测到 options 包含 render 选项，即是否包含渲染函数。
// 包含的话，就直接调用运行时的 $mount
/**
 * 定义在 src/platforms/web/runtime/index.js
 * public mount method
 * 因为 Vue 有很多构建版本, 有些版本会依赖此方法进行有些功能定制,
 */
const mount = MyVue.prototype.$mount
MyVue.prototype.$mount = function $mount(el) {
  let vm = this
  el = el && query(el)

  if (el === document.body || el === document.documentElement) {
    warn(
      '挂载点的本意是组件挂载的占位，它将会被组件自身的模板替换掉，而<body>元素和<html>元素是不能被替换掉的'
    )
    return this
  }
  return mount.call(vm, el)
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
    warn('data functions should return an object')
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
  set: noop,
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
