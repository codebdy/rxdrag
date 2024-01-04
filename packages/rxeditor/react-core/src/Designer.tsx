import React, { useCallback } from "react"
import {
  IDesignerEngine,
  createEngine,
  ThemeMode,
  liquidPlugins,
  freedomPlugins,
} from "@rxdrag/core";
import { memo, useEffect, useRef, useState } from "react"
import { CanvasConfigContext, DesignerEngineContext } from "./contexts";
import { LocalesContext } from "@rxdrag/react-locales";
import { ICanvasConfig, IMaterial } from "./interfaces";
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { ISetterComponents } from "@rxdrag/core";
import { Fieldy } from "@rxdrag/react-fieldy";
import { ComponentDesignersRoot } from "./ComponentDesignersRoot";
import { ILocales } from "@rxdrag/locales";
//import { PreviewComponentsContext } from "@rxdrag/react-runner";

export enum LayoutType {
  Liquid = "liquid",
  Freedom = "freedom"
}

export interface DesignerProps {
  //minionOptions?: IMinionOptions,
  themeMode?: ThemeMode,
  children?: React.ReactNode,
  //初始物料，其它地方还可以继续注册
  materials?: IMaterial[]
  setters?: ISetterComponents<ReactComponent>
  locales?: ILocales,
  layoutType?: LayoutType,
  canvasConfig?: ICanvasConfig,
}
export const Designer = memo((props: DesignerProps) => {
  const { themeMode = "light", children, materials, setters, locales, layoutType = LayoutType.Liquid, canvasConfig } = props
  const [components, setComponents] = useState<IReactComponents>({})
  const [designers, setDesigners] = useState<IReactComponents>({})
  const [engine, setEngine] = useState<IDesignerEngine>();
  const themeModeRef = useRef(themeMode)
  themeModeRef.current = themeMode
  useEffect(() => {
    let eng: IDesignerEngine<ReactComponent, React.ReactNode> | undefined = undefined
    eng = createEngine(
      layoutType === LayoutType.Liquid ? liquidPlugins : freedomPlugins,
      {
        debugMode: false
      }
    )
    setEngine(eng)
    return () => {
      eng?.destroy()
    }

  }, [layoutType])

  useEffect(() => {
    if (engine) {
      engine.getActions().setThemeMode(themeMode)
    }
  }, [engine, themeMode])
  //const register = useRegisterComponentMaterial()

  useEffect(() => {
    engine?.registerMaterials(materials || [])
  }, [engine, materials])

  useEffect(() => {
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
      const desns: IReactComponents = {}
      for (const key of Object.keys(materials)) {
        coms[key] = materials[key]?.component
        desns[key] = materials[key]?.designer
      }
      setComponents(coms)
      setDesigners(desns)
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
      <CanvasConfigContext.Provider value={canvasConfig}>
        <LocalesContext.Provider value={engine?.getLocalesManager()}>
          <DesignerEngineContext.Provider value={engine}>
            <ComponentDesignersRoot components={designers}>
              {
                //Preivew的时候用的组件，主要针对无Iframe画布
                //<PreviewComponentsContext.Provider value={components}>
                engine && children
                //</ComponentDesignersRoot></PreviewComponentsContext.Provider>
              }
            </ComponentDesignersRoot>
          </DesignerEngineContext.Provider>
        </LocalesContext.Provider>
      </CanvasConfigContext.Provider>
    </Fieldy>
  )
})