import { hasProto, isObject, def } from '../util'
import { arrayMethods } from './array'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export default class Observe {
  // 用 `value` 准确的说明是对值进行 observe
  constructor(value) {
    if (Array.isArray(value)) {
      // 让数组的 push 等操作也能被 observe 到
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // 遍历数组，observe 每个元素
      observeArray(value)
    } else {
      // 遍历对象属性，observe 每个属性
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj) {
    // 我觉得这里不用 for in 可能是 Object.keys 更严格，不是 object 会报错
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function defineReactive(obj, key, val) {
  if (arguments.length === 2) {
    val = obj[key]
  }
  // 多层级的 observe
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val
    },
    set: function reactiveSetter(newVal) {
      // 如果新值和原来一样，或者都是 NaN 直接退出
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return
      }
      val = newVal
      console.log('更新了', newVal)
      // 对新值 observe
      observe(newVal)
    },
  })
}

export function observe(data) {
  if (!isObject(data)) {
    return
  }
  return new Observe(data)
}

export function observeArray(items) {
  for (let i = 0, l = items.length; i < l; i++) {
    observe(items[i])
  }
}

/**
 * 通过拦截原型链来加强 target 对象或数组
 */
function protoAugment(target, src) {
  target.__proto__ = src
}

// 通过 defineProperty 隐藏的 properties 来增强
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
