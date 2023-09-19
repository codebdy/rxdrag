import { useContext } from "react";
import { ActiveIdContext } from "../contexts";

export function useActiveIdState() {
  return useContext(ActiveIdContext)
}