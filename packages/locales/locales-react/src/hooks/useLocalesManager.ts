import { useContext } from "react";
import { LocalesContext } from "../contexts";

export function useLocalesManager(){
  return useContext(LocalesContext)
}