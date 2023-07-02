import { useContext } from "react";
import { MinionOptionContext } from "../contexts";

export function useMinionOptions() {
  return useContext(MinionOptionContext)
}