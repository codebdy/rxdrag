import { memo } from "react"
import { FrontendDesigner } from "./FrontendDesigner"
import { DeviceType } from "./interfaces"
import { Navigate, Route, Routes } from "react-router-dom"
import { ModuleUiDesigner } from "./FrontendDesigner/ModuleUiDesigner"
import { NavType } from "./FrontendDesigner/LeftSide"
import { UiFrameDesigner } from "./FrontendDesigner/UiFrameDesigner"
import { MenuDesigner } from "./FrontendDesigner/MenuDesigner"
import { AppDesigner } from "./AppDesigner"

export const AppDesignerExample = memo((props: {
  canvasUrl: string,
  previewUrl: string,
}) => {
  const { canvasUrl, previewUrl } = props

  return (
    <Routes>
      <Route path={""} element={<AppDesigner />}>
        <Route index element={<Navigate to={"ui-designer/" + DeviceType.admin} replace />} />
        <Route path={"/ui-designer/:device"} element={<FrontendDesigner />}>
          <Route index element={<Navigate to={NavType.modules} replace />} />
          <Route path={NavType.modules + "/:moduleId?"} element={<ModuleUiDesigner
            canvasUrl={canvasUrl}
            previewUrl={previewUrl}
          //themeMode={themeMode}
          />}></Route>
          <Route path={NavType.frame} element={<UiFrameDesigner
            canvasUrl={canvasUrl}
            previewUrl={previewUrl}
          //themeMode={themeMode}
          />}></Route>
          <Route path={NavType.menu} element={<MenuDesigner />}></Route>
        </Route>
      </Route>
    </Routes>
  )
})