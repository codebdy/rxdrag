import { useContext } from "react";
import { ControllerContext } from "../contexts";

export function useController() {
  return useContext(ControllerContext)
}