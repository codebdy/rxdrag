import { useContext } from "react";
import { ActionHandlersContext } from "./context";

export function useActionHandlers(){
  return useContext(ActionHandlersContext)
}