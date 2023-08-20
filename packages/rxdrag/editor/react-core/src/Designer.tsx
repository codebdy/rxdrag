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
import { IComponentMaterial } from "./interfaces";
import { LocalesContext } from "@rxdrag/react-locales";

export interface DesignerProps {
  materials?: IComponentMaterial[]
  onReady?: (engine: IDesignerEngine) => void,
  themeMode?: ThemeMode,
  children?: React.ReactNode
}
export const Designer = memo((props: DesignerProps) => {
  const { themeMode = "light", materials, children, onReady } = props
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
      eng?.destroy()
    }

  }, [onReady])

  useEffect(() => {
    if (engine) {
      engine.getActions().setThemeMode(themeMode)
    }
  }, [engine, themeMode])
  //const register = useRegisterComponentMaterial()

  useEffect(() => {
    if (engine && materials?.length) {
      console.log("Designer 初始化时注册组件")
      engine.registerMaterials(materials)
    }
  }, [materials, engine])

  return (
    <LocalesContext.Provider value={engine?.getLocalesManager()}>
      <DesignerEngineContext.Provider value={engine}>
        {children}
      </DesignerEngineContext.Provider>
    </LocalesContext.Provider>
  )
})