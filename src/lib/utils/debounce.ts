export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 400
) {
  let timer: number | undefined

  return (...args: Parameters<T>) => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
