import { ID } from "@rxdrag/shared"
import { useAppFrontend } from "./useAppFrontend"

export function useMenu(menuId?: ID) {
  const appFront = useAppFrontend()

  return appFront?.menus?.find(menu => menu.id === menuId)
}