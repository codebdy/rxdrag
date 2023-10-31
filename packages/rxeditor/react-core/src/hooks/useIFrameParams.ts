import { useContext } from "react";
import { ParamsContext } from "../contexts";

export function useIFrameParams(){
  return useContext(ParamsContext)
}