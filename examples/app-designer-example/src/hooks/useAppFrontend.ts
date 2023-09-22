import { useContext } from "react";
import { AppFrontendContext } from "../contexts";

export function useAppFrontend(){
  return useContext(AppFrontendContext)
}