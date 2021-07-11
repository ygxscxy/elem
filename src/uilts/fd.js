export default function fangdou(func, timeout) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this)
    }, timeout)
  }
}