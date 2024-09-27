import { getPadding } from "@/utils/dom"

export function useOverflowHidden(target: HTMLElement) {
  const range = document.createRange()
  range.setStart(target, 0)
  range.setEnd(target, target.childNodes.length)

  const { width: rangeWidth, height: rangeHeight } =
    range.getBoundingClientRect()
  const { width, height } = target.getBoundingClientRect()

  const { left, top, bottom, right } = getPadding(target)
  const verPadding = top + bottom;
  const horPadding = left + right;

  return rangeHeight + verPadding > height || rangeWidth + horPadding > width || target.scrollWidth > target.clientWidth
}
