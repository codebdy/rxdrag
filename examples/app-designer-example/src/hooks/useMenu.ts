import { useParams } from "react-router-dom"
import { useAppFrontend } from "./useAppFrontend"

export function useMenu() {
  const { menuId } = useParams()
  const appFront = useAppFrontend()

  return appFront?.menus?.find(menu => menu.id === menuId)
}