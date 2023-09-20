import { ReactMenuDesigner } from "@rxdrag/react-menu-designer"
import { memo } from "react"
import { Toolbox } from "./Toolbox"
import { menuDesgnerLocales } from "./localse"

export const MenuDesigner = memo(() => {
  return (
    <ReactMenuDesigner
      toolbox={<Toolbox />}
      locales={menuDesgnerLocales}
    />
  )
})