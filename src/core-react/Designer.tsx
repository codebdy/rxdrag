import { GhostWidget } from "core/auxwidgets/ghost";
import { InsertionCursor } from "core/auxwidgets/insertion";
import { ActivedOutline } from "core/auxwidgets/outlines/ActivedOutline";
import { SelectedOutline } from "core/auxwidgets/outlines/SelectedOutline";
import { Toolbar } from "core/auxwidgets/toolbar";
import { IDesignerEngine } from "core";
import { ActiveController, DragOverController, DragStopController, SelectionController } from "core/controllers";
import { StartDragController } from "core/controllers/StartDragController";
import { createEngine } from "core/createEngine";
import { memo, useEffect, useRef, useState } from "react"
import { DesignerEngineContext } from "./contexts";
import { DesignRoot } from "./DesignRoot";
import { PreviewRoot } from "./PreviewRoot";
import { IComponentMaterial } from "./interfaces";
import { useComponentsFromMaterials } from "./hooks/useComponentsFromMaterials";
import { DraggedAttenuator } from "core/auxwidgets/dragged-attenuator";
import { ThemeMode } from "core/interfaces/action";

export interface DesignerProps {
  components?: IComponentMaterial[]
  onReady?: (engine: IDesignerEngine) => void,
  themeMode?: ThemeMode,
  children?: React.ReactNode
}
export const Designer = memo((props: DesignerProps) => {
  const { themeMode = "light", components, children, onReady } = props
  const [engine, setEngine] = useState<IDesignerEngine>();
  const themeModeRef = useRef(themeMode)
  themeModeRef.current = themeMode
  useEffect(() => {
    let eng: IDesignerEngine | undefined = undefined
    eng = createEngine(
      [
        StartDragController,
        SelectionController,
        DragStopController,
        DragOverController,
        ActiveController,
        ActivedOutline,
        SelectedOutline,
        GhostWidget,
        DraggedAttenuator,
        InsertionCursor,
        Toolbar,
      ],
      {
        debugMode: false
      }
    )
    setEngine(eng)
    onReady && onReady(eng)
    return () => {
      eng?.destory()
    }

  }, [onReady])

  useEffect(()=>{
    if(engine){
      engine.getActions().setThemeMode(themeMode)
    }
  }, [engine, themeMode])

  useEffect(() => {
    if (engine && components?.length) {
      console.log("Designer 初始化时注册组件")
      engine.getComponentManager().registerComponents(...components)
    }
  }, [components, engine])

  const { designComponents, previewComponents } = useComponentsFromMaterials(components)

  return (
    <DesignerEngineContext.Provider value={engine}>
      <DesignRoot components={designComponents}>
        <PreviewRoot components={previewComponents}>
          {children}
        </PreviewRoot>
      </DesignRoot >
    </DesignerEngineContext.Provider>
  )
})