import { useCallback } from "react";
import { DRAGGABLE_ATTR_ID_NAME } from "../consts";

export function useGetItemElement(container: HTMLElement | undefined) {
  const getItemElement = useCallback((id: string) => {
    return container?.querySelector(`[${DRAGGABLE_ATTR_ID_NAME}="${id}"]`)
  }, [container])
  return getItemElement
}