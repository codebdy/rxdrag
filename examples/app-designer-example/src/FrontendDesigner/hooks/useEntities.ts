import { useContext } from "react";
import { EntitiesContext } from "../contexts";

export function useEntities() {
  return useContext(EntitiesContext)
}