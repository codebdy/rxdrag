import { useContext } from "react";
import { ControllersContext } from "../contexts";

export function useAllControllers(){
  return useContext(ControllersContext)
}