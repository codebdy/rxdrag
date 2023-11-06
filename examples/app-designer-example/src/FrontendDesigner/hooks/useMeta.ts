import { useContext } from "react";
import { MetaContext } from "../contexts";

export function useMeta() {
  return useContext(MetaContext)
}