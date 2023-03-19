import { FieldyContext } from "runner/fieldy/contexts";
import { IFieldyEngine } from "runner/fieldy/interfaces";
import { useContext } from "react";

export function useFieldy() {
  const fieldy = useContext<IFieldyEngine | undefined>(FieldyContext)
  return fieldy;
}