import { popTarget, pushTarget } from './dep'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  constructor(vm, expOrFn, cb = () => {}) {
    console.log('new Watcher uid', uid)
    this.vm = vm
    this.expOrFn = expOrFn
    this.cb = cb
    this.id = ++uid
    this.deps = []
    this.depIds = new Set()
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    }
    this.value = this.get() // 创建一个 watcher 默认调用此方法
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } finally {
      popTarget()
    }
    return value
  }

  update() {
    console.log('watcher update')
    this.get()
  }

  addDep(dep) {
    const id = dep.id
    if (!this.depIds.has(id)) {
      this.depIds.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
}
