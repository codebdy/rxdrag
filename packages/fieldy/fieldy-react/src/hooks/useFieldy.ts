import { IFieldyEngine } from "@rxdrag/fieldy";
import { useContext } from "react";
import { FieldyContext } from "../contexts";

export function useFieldy() {
  const fieldy = useContext<IFieldyEngine | undefined>(FieldyContext)
  return fieldy;
}