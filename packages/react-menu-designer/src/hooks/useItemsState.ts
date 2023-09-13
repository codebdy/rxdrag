import { useContext } from "react";
import { ItemsContext } from "../contexts";

export function useItemsState(){
  return useContext(ItemsContext)
}