import { memo } from "react"
import { FrontendDesigner } from "./FrontendDesigner"
import { DeviceType } from "./interfaces"
import { Navigate, Route, Routes } from "react-router-dom"
import { ModuleUiDesigner } from "./FrontendDesigner/ModuleUiDesigner"
import { NavType } from "./FrontendDesigner/LeftSide"
import { UiFrameDesigner } from "./FrontendDesigner/UiFrameDesigner"
import { MenuDesigner } from "./FrontendDesigner/MenuDesigner"
import { AppDesigner } from "./AppDesigner"
import "./style.css"
import { DesignerCanvas } from "./FrontendDesigner/DesignerCanvas"
import { DesignerPreview } from "./FrontendDesigner/DesignerPreview"
import { CANVAS_URL_PREFIX, PREVIEW_URL_PREFIX } from "./FrontendDesigner/consts"
import { useQueryApp } from "./hooks/useQueryApp"
import { AppContext } from "./contexts"
import { FrontendRoot } from "./FrontendRoot"

export const AppDesignerExample = memo(() => {
  const { app } = useQueryApp("app1")
  return (
    <AppContext.Provider value={app}>
      {app &&
        <Routes>
          <Route path="" element={<FrontendRoot />}>
            <Route path={""} element={<AppDesigner />}>
              <Route index element={<Navigate to={"ui-designer/" + DeviceType.admin} replace />} />
              <Route path={"/ui-designer/:device"} element={<FrontendDesigner />}>
                <Route index element={<Navigate to={NavType.modules} replace />} />
                <Route path={NavType.modules + "/:moduleId?"} element={<ModuleUiDesigner />}></Route>
                <Route path={NavType.frame} element={<UiFrameDesigner />}></Route>
                <Route path={NavType.menu} element={<MenuDesigner />}></Route>
              </Route>
            </Route>
            <Route path={CANVAS_URL_PREFIX + '/:device/:layoutPart'} element={<DesignerCanvas />}>
            </Route>
            <Route path={PREVIEW_URL_PREFIX + '/:device/:layoutPart'} element={<DesignerPreview />}>
            </Route>
          </Route>
        </Routes>
      }
    </AppContext.Provider>
  )
})