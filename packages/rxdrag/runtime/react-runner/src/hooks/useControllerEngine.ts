import { useContext } from "react";
import { ControllerEngineContext } from "../contexts";
import { ControllerEngine } from "../RuntimeRoot/ControllerEngine";

export function useControllerEngine() {
  const controllerEngine = useContext<ControllerEngine | undefined>(ControllerEngineContext)
  return controllerEngine;
}