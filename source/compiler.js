/**
 * ?: 不捕获分组
 * . 除换行外的所有字符
 * \r?\n 换行
 * +? + 一个或更多，后面加个问号，懒匹配，匹配最少
 */
const defaultRGE = /\{\{((?:.|\r?\n)+?)\}\}/g

export const util = {
  getValue(vm, exp) {
    let keys = exp.split('.')
    return keys.reduce((acc, cur) => {
      acc = acc[cur]
      return acc
    }, vm)
  },
  compilerText(node, vm) {
    node.textContent = node.textContent.replace(defaultRGE, function(...arg) {
      return util.getValue(vm, arg[1])
    })
  }
}

export function compiler(node, vm) {
  let childNodes = node.childNodes
  childNodes = Array.from(childNodes)
  childNodes.forEach((child) => {
    // 1 Node.ELEMENT_NODE
    // 3 Node.TEXT_NODE
    if (child.nodeType === 1) {
      compiler(child, vm)
    } else {
      util.compilerText(child, vm)
    }
  })
}
