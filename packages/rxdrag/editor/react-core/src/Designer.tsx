import React from "react"
import {
  GhostWidget,
  InsertionCursor,
  ActivedOutline,
  SelectedOutline,
  Toolbar,
  IDesignerEngine,
  ActiveController,
  DragOverController,
  DragStopController,
  SelectionController,
  StartDragController,
  createEngine,
  ThemeMode,
  DraggedAttenuator,
} from "@rxdrag/core";
import { memo, useEffect, useRef, useState } from "react"
import { DesignerEngineContext } from "./contexts";
import { DesignRoot } from "./DesignRoot";
import { IComponentMaterial } from "./interfaces";
import { useComponentsFromMaterials } from "./hooks/useComponentsFromMaterials";
import { LocalesContext } from "@rxdrag/react-locales";

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

  useEffect(() => {
    if (engine) {
      engine.getActions().setThemeMode(themeMode)
    }
  }, [engine, themeMode])

  useEffect(() => {
    if (engine && components?.length) {
      console.log("Designer 初始化时注册组件")
      engine.getComponentManager().registerComponents(...components)
    }
  }, [components, engine])

  const { designComponents } = useComponentsFromMaterials(components)

  return (
    <LocalesContext.Provider value={engine?.getLoacalesManager()}>
      <DesignerEngineContext.Provider value={engine}>
        <DesignRoot components={designComponents}>
          {children}
        </DesignRoot >
      </DesignerEngineContext.Provider>
    </LocalesContext.Provider>
  )
})