import { useContext } from "react";
import { RuntimeEngineContext } from "../contexts";
import { RuntimeEngine } from "../RuntimeRoot/RuntimeEngine";

export function useRuntimeEngine() {
  const schema = useContext<RuntimeEngine | undefined>(RuntimeEngineContext)
  return schema;
}