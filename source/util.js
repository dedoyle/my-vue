export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

const _toString = Object.prototype.toString

export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

export function noop(_) {
  return _
}

// can we use proto
export function hasProto() {
  return '__proto__' in {}
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

// define a property
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}

export function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  } else {
    return el
  }
}

export let warn = noop

if (process.env.NODE_ENV !== 'production') {
  warn = (msg) => {
    console.error(`[Vue warn]: ${msg}`)
  }
} 