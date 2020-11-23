export const pipe = (...fns) => args =>
  fns.reduce((a, fn) => {
    a = { ...a, ...fn(a) }
    return a
  }, args)
