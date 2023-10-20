import { memo } from "react"
import { FrontendDesigner } from "./FrontendDesigner"
import { DeviceType } from "./interfaces"
import { Navigate, Route, Routes } from "react-router-dom"
import { ModuleUiDesigner } from "./FrontendDesigner/ModuleUiDesigner"
import { NavType } from "./FrontendDesigner/LeftSide"
import { UiFrameDesigner } from "./FrontendDesigner/UiFrameDesigner"
import { NavigationDesigner } from "./FrontendDesigner/NavigationDesigner"
import { AppDesigner } from "./AppDesigner"
import "./style.css"
import { DesignerCanvas } from "./FrontendDesigner/DesignerCanvas"
import { DesignerPreview } from "./FrontendDesigner/DesignerPreview"
import { CANVAS_URL_PREFIX, PREVIEW_URL_PREFIX } from "./FrontendDesigner/consts"
import { useQueryApp } from "./hooks/useQueryApp"
import { AppContext } from "./contexts"
import { FrontendRoot } from "./FrontendRoot"
import { TopNavType } from "./Toolbar"
import { ModelEditor } from "./ModelEditor"
import { ServiceExtension } from "./ServiceExtension"
import { ApiBoard } from "./ApiBoard"
import { WorkflowEditor } from "./WorkflowEditor"
import { Settings } from "./Settings"
import { PluginManager } from "./PluginManager"

export const AppDesignerExample = memo(() => {
  const { app } = useQueryApp("app1")

  return (
    <AppContext.Provider value={app}>
      {app &&
        <Routes>
          <Route path="" element={<FrontendRoot />}>
            <Route path={""} element={<AppDesigner />}>
              <Route index element={<Navigate to={`${TopNavType.ui}/` + DeviceType.admin} replace />} />
              <Route path={`/${TopNavType.ui}/:device`} element={<FrontendDesigner />}>
                <Route index element={<Navigate to={NavType.modules} replace />} />
                <Route path={NavType.modules + "/:moduleId?"} element={<ModuleUiDesigner />}></Route>
                <Route path={NavType.frame} element={<UiFrameDesigner />}></Route>
                <Route path={NavType.menu + "/:menuId?"} element={<NavigationDesigner />}></Route>
              </Route>
              <Route path={`/${TopNavType.model}/`} element={<ModelEditor />}></Route>
              <Route path={`/${TopNavType.extends}/`} element={<ServiceExtension />}></Route>
              <Route path={`/${TopNavType.api}/`} element={<ApiBoard />}></Route>
              <Route path={`/${TopNavType.workflow}/`} element={<WorkflowEditor />}></Route>
              <Route path={`/${TopNavType.plugins}/`} element={<PluginManager />}></Route>
              <Route path={`/${TopNavType.setttings}/`} element={<Settings />}></Route>
            </Route>
            <Route path={CANVAS_URL_PREFIX + '/:device/:layoutPart'}
              element={<DesignerCanvas />}
            >
            </Route>
            <Route path={PREVIEW_URL_PREFIX + '/:device/:layoutPart/:moduleId'}
              element={<DesignerPreview />}
            >
            </Route>
          </Route>
        </Routes>
      }
    </AppContext.Provider>
  )
})