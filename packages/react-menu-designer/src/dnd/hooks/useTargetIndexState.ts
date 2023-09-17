import { useContext } from "react";
import { TargetIndexContext } from "../contexts";

export function useTargetIndexState() {
  return useContext(TargetIndexContext)
}