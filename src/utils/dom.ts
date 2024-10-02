export function getPadding(el: HTMLElement) {
  const parseInt = (target: string) => Number.parseInt(target) || 0

  const style = window.getComputedStyle(el, null)
  const left = parseInt(style.paddingLeft)
  const right = parseInt(style.paddingRight)
  const top = parseInt(style.paddingTop)
  const bottom = parseInt(style.paddingBottom)

  return { left, right, top, bottom }
}
