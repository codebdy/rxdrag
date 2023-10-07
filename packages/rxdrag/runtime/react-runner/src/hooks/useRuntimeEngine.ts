import { useContext } from "react";
import { ControllerEngineContext } from "../contexts";
import { ControllerEngine } from "../RuntimeRoot/ControllerEngine";

export function useRuntimeEngine() {
  const runtimeEngine = useContext<ControllerEngine | undefined>(ControllerEngineContext)
  return runtimeEngine;
}