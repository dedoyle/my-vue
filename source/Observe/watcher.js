let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  constructor(vm, expOrFn, cb = () => {}, options) {
    this.vm = vm
    this.expOrFn = expOrFn
    this.cb = cb
    this.id = uid++
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    }
    this.get() // 创建一个 watcher 默认调用此方法
  }

  get() {
    this.getter()
  }
}
