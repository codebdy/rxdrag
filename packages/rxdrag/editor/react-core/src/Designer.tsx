import React, { useCallback } from "react"
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
import { DesignerEngineContext, IMinionOptions, MinionOptionContext } from "./contexts";
import { LocalesContext } from "@rxdrag/react-locales";
import { IComponentMaterial } from "./interfaces";
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { ISetterComponents } from "@rxdrag/core/src/interfaces/setter";
import { Fieldy } from "@rxdrag/react-fieldy";
import { ComponentsRoot } from "./ComponentsRoot";
import { ILocales } from "@rxdrag/locales";

export interface DesignerProps {
  minionOptions?: IMinionOptions,
  themeMode?: ThemeMode,
  children?: React.ReactNode,
  //初始物料，其它地方还可以继续注册
  materials?: IComponentMaterial[]
  setters?: ISetterComponents<ReactComponent>
  locales?: ILocales,
}
export const Designer = memo((props: DesignerProps) => {
  const { minionOptions, themeMode = "light", children, materials, setters, locales } = props
  const [components, setComponents] = useState<IReactComponents>({})
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
    engine?.registerMaterials(materials || [])
  }, [engine, materials])

  useEffect(()=>{
    const langMgr = engine?.getLocalesManager()
    locales && langMgr?.registerLocales(locales)
  }, [engine, locales])

  useEffect(() => {
    if (setters) {
      engine?.getSetterManager().registerSetters(setters)
    }
  }, [engine, setters])

  const pullComponents = useCallback(() => {
    const materials = engine?.getComponentManager().getAllComponentConfigs()
    if (materials) {
      const coms: IReactComponents = {}
      for (const key of Object.keys(materials)) {
        coms[key] = materials[key]?.component
      }
      setComponents(coms)
    }
  }, [engine])

  useEffect(() => {
    pullComponents()
  }, [pullComponents])

  useEffect(() => {
    const unsub = engine?.getComponentManager().subscribeComponentsChange(pullComponents)
    return unsub
  }, [engine, pullComponents])

  return (
    <Fieldy>
      <MinionOptionContext.Provider value={minionOptions}>
        <LocalesContext.Provider value={engine?.getLocalesManager()}>
          <DesignerEngineContext.Provider value={engine}>
            {
              //Preivew的时候用的组件，主要针对无Iframe画布
              <ComponentsRoot components={components}>
                {engine && children}
              </ComponentsRoot>
            }
          </DesignerEngineContext.Provider>
        </LocalesContext.Provider>
      </MinionOptionContext.Provider>
    </Fieldy>
  )
})