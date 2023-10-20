import { useContext } from "react";
import { MetaContext } from "../contexts";

export function useMetaContent(){
  return useContext(MetaContext)
}