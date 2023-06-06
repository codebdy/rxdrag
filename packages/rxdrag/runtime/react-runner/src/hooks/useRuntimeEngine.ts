import { useContext } from "react";
import { RuntimeEngineContext } from "../contexts";
import { RuntimeEngine } from "../RuntimeRoot/RuntimeEngine";

export function useRuntimeEngine() {
  const runtimeEngine = useContext<RuntimeEngine | undefined>(RuntimeEngineContext)
  return runtimeEngine;
}