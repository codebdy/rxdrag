import { useContext } from "react";
import { VariablesContext } from "./context";

export function useVariables(){
  return useContext(VariablesContext)
}