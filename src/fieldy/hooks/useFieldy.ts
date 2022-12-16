import { FieldyContext } from "fieldy/contexts";
import { IFieldyEngine } from "fieldy/interfaces";
import { useContext } from "react";

export function useFieldy() {
  const fieldy = useContext<IFieldyEngine | undefined>(FieldyContext)
  return fieldy;
}