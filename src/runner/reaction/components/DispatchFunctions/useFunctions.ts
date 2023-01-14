import { useContext } from "react";
import { ActionHandlersContext } from "./context";

export function useFunctions(){
  return useContext(ActionHandlersContext)
}