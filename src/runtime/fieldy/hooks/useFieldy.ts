import { FieldyContext } from "runtime/fieldy/contexts";
import { IFieldyEngine } from "runtime/fieldy/interfaces";
import { useContext } from "react";

export function useFieldy() {
  const fieldy = useContext<IFieldyEngine | undefined>(FieldyContext)
  return fieldy;
}