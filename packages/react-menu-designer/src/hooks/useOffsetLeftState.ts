import { useContext } from "react";
import { OffsetLeftContext } from "../contexts";

export function useOffsetLeftState(){
  return useContext(OffsetLeftContext)
}