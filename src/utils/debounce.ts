export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  immediate = false
): () => void {
  let timeout: NodeJS.Timeout | null
  return function (this: any, ...args: any[]) {
    let context = this
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
