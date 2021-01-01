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
const targetStack = []

export function pushTarget(watcher) {
  Dep.target = watcher
  console.log('pushTarget watcher.id ', watcher.id)
  targetStack.push(watcher)
}

export function popTarget() {
  targetStack.pop()
  console.log('popTarget')
  console.log('++++++++++++++++++++')
  Dep.target = targetStack[targetStack.length - 1]
}
