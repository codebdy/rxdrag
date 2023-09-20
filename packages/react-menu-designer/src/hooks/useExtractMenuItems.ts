import { useCallback } from "react";
import { IMenuItem } from "../interfaces";

export function useExtractMenuItems(){
  const extract = useCallback(()=>{
    const menuItems:IMenuItem[] = []

    return menuItems
  },[])

  return extract
}