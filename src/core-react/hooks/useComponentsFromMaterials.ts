import { IComponentMaterial, IComponents } from "core-react/interfaces";
import { useMemo } from "react";

export function useComponentsFromMaterials(materials?: IComponentMaterial[]){
  const components = useMemo(()=>{
    const dComponents:IComponents = {}
    const pComponents:IComponents = {}
    for(const material of materials||[]){
      dComponents[material.componentName] = material.designer
      pComponents[material.componentName] = material.component
    }
    return {designComponents: dComponents, previewComponents: pComponents}
  }, [materials])

  return components
}