import { IMenuItem, IMenuItemResource, ReactMenuDesigner, SelectorOption } from "@rxdrag/react-menu-designer"
import { memo, useCallback, useMemo } from "react"
import { Toolbox } from "./Toolbox"
import { menuDesgnerLocales } from "./locales"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { baseMenuResources, iconableRender } from "./resrouces"
import { IModule } from "../../interfaces/module"
import { createId } from "@rxdrag/shared"
import { IModuleItemConfig, moduleResouceType } from "./types"
import { ModuleSetter } from "./setters/ModuleSetter"
import { useMenu } from "../../hooks/useMenu"
import { useParams } from "react-router-dom"

export function createModuleResoure(module: IModule): IMenuItemResource<IModuleItemConfig> {
  return {
    id: createId(),
    title: module.title,
    childless: true,
    configSetter: ModuleSetter,
    render: iconableRender,
    createMenuItem: () => {
      return {
        id: createId(),
        type: moduleResouceType,
        config: {
          title: module.title,
          moduleId: module.id,
        }
      }
    },
    selector: (item?: SelectorOption<IModuleItemConfig>) => {
      return item?.type === moduleResouceType && item.config?.moduleId === module.id
    }
  }
}

export const NavigationDesigner = memo(() => {
  const appFront = useAppFrontend()
  const { menuId } = useParams()
  const menu = useMenu(menuId)
  const resources: IMenuItemResource[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reses: IMenuItemResource<any>[] = [...baseMenuResources]
    for (const category of appFront?.moduleCategories || []) {
      for (const module of category.modules || []) {
        reses.push(createModuleResoure(module))
      }
    }
    return reses
  }, [appFront?.moduleCategories])

  const handleSave = useCallback((value: IMenuItem[]) => {
    console.log("===>handleSave", value)
  }, [])

  return (
    menu
      ? <ReactMenuDesigner
        toolbox={<Toolbox resources={resources} />}
        locales={menuDesgnerLocales}
        resources={resources}
        value={menu.items}
        name={menu.title}
        onSave={handleSave}
      />
      : <></>
  )
})