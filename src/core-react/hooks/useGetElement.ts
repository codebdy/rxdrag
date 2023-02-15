import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useGetElement(){

  const engine = useDesignerEngine()
  const getElement = useCallback((rxId?:string)=>{
    return rxId && engine?.getShell()?.getElement(rxId)
  }, [engine])

  return getElement
}