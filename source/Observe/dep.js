let uid = 0
export default class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
}
