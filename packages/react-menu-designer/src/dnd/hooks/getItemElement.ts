import { useCallback } from "react";
import { useGetItemElement } from "./useGetItemElement";

export function useGetItemCenterPoint(container: HTMLElement | undefined) {
  const getItemElement = useGetItemElement(container)

  const getCenter = useCallback((id: string) => {
    const rect = getItemElement(id)?.getBoundingClientRect()
    if (rect) {
      return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 1
      }
    }
  }, [getItemElement])

  return getCenter
}