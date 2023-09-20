import { IMenuItemResource, ReactMenuDesigner, SelectorOption } from "@rxdrag/react-menu-designer"
import { memo, useMemo } from "react"
import { Toolbox } from "./Toolbox"
import { menuDesgnerLocales } from "./localse"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { baseMenuResources } from "./resrouces"
import { IModule } from "../../interfaces/module"
import { createId } from "@rxdrag/shared"
import { IModuleItemConfig, moduleResouceType } from "./types"
import { ModuleSetter } from "./setters/ModuleSetter"


export function createModuleResoure(module: IModule): IMenuItemResource<IModuleItemConfig> {
  return {
    id: createId(),
    title: module.title,
    childless: true,
    configSetter: ModuleSetter,
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

export const MenuDesigner = memo(() => {
  const appFront = useAppFrontend()
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

  return (
    <ReactMenuDesigner
      toolbox={<Toolbox resources={resources} />}
      locales={menuDesgnerLocales}
      resources={resources}
    />
  )
})