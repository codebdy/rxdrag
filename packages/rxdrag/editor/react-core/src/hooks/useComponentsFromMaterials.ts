import { IComponentMaterial } from "../interfaces";
import { useMemo } from "react";
import {IReactComponents} from "@rxdrag/react-shared"

export function useComponentsFromMaterials(materials?: IComponentMaterial[]){
  const components = useMemo(()=>{
    const dComponents:IReactComponents = {}
    const pComponents:IReactComponents = {}
    for(const material of materials||[]){
      dComponents[material.componentName] = material.designer
      pComponents[material.componentName] = material.component
    }
    return {designComponents: dComponents, previewComponents: pComponents}
  }, [materials])

  return components
}