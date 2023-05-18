import { useContext } from "react";


export function useController(){
  return useContext(ControllerContext)
}