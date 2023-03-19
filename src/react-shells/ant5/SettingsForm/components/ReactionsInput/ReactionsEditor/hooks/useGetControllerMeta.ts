import { useCallback } from "react"
import { IControllerMeta } from "runner/minions"
import {useControllerNodes} from "./useControllerNodes"

export function useGetControllerMeta(){
  const controllerNodes = useControllerNodes()
  const getControllerMeta=useCallback((controllerId:string)=>{
    for(const node of controllerNodes){
      const controllerMeta = node.meta["x-reactions"] as IControllerMeta|undefined
      if(controllerMeta?.id === controllerId){
        return controllerMeta
      }
    }
  }, [controllerNodes])

  return getControllerMeta
}