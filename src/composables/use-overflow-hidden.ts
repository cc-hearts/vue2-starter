export function useOverflowHidden(target: HTMLElement) {
  const range = document.createRange()
  range.setStart(target, 0)
  range.setEnd(target, target.childNodes.length)
  const { width: rangeWidth, height: rangeHeight } =
    range.getBoundingClientRect()
  const { width, height } = target.getBoundingClientRect()

  return rangeHeight > height || rangeWidth > width
}
