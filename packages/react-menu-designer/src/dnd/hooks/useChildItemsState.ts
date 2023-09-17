import { useContext } from "react";
import { ChildItemsContext } from "../contexts";

export function useChildItemsState() {
  return useContext(ChildItemsContext)
}