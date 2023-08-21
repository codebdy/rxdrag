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
import { LocalesContext } from "@rxdrag/react-locales";
import { IComponentMaterial } from "./interfaces";
import { ReactComponent } from "@rxdrag/react-shared";

export interface DesignerProps {
  themeMode?: ThemeMode,
  children?: React.ReactNode,
  //初始物料，其它地方还可以继续注册
  materials?: IComponentMaterial[]
}
export const Designer = memo((props: DesignerProps) => {
  const { themeMode = "light", children, materials } = props
  const [engine, setEngine] = useState<IDesignerEngine>();
  const themeModeRef = useRef(themeMode)
  themeModeRef.current = themeMode
  useEffect(() => {
    let eng: IDesignerEngine<ReactComponent, React.ReactNode> | undefined = undefined
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
    return () => {
      eng?.destroy()
    }

  }, [])

  useEffect(() => {
    if (engine) {
      engine.getActions().setThemeMode(themeMode)
    }
  }, [engine, themeMode])
  //const register = useRegisterComponentMaterial()

  useEffect(() => {
    console.log("Designer 初始化时注册组件")
    engine?.registerMaterials(materials || [])
  }, [engine, materials])

  return (
    <LocalesContext.Provider value={engine?.getLocalesManager()}>
      <DesignerEngineContext.Provider value={engine}>
        {engine && children}
      </DesignerEngineContext.Provider>
    </LocalesContext.Provider>
  )
})