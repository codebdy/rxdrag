import { useContext } from "react";
import { MenuSchemaContext } from "../contexts";

export function useMenuSchemaState(){
  return useContext(MenuSchemaContext)
}