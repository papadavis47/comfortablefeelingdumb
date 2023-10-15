// export function debounce(func, wait, immediate) {
//   let timeout
//   return function () {
//     let context = this,
//       args = arguments
//     const later = function () {
//       timeout = null
//       if (!immediate) func.apply(context, args)
//     }
//     const callNow = immediate && !timeout
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//     if (callNow) func.apply(context, args)
//   }
// }

export function debounce(func, wait) {
  let timeout
  return function () {
    let context = this,
      args = arguments
    const later = function () {
      timeout = null
      func.apply(context, args)
    }
    const callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
