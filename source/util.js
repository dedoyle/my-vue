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

// define a property
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
