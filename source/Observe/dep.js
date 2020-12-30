let uid = 0
export default class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
let targetStack = []

export function pushTArget(watcher) {
  Dep.target = watcher
  targetStack.push(watcher)
}

export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
