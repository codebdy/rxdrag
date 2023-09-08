import { useContext } from "react";
import { AppContext } from "../contexts";

export function useApp() {
  return useContext(AppContext)
}