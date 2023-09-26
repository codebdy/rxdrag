import { useContext } from "react";
import { ModuleContext } from "../contexts";

export function useModule() {
  return useContext(ModuleContext)
}