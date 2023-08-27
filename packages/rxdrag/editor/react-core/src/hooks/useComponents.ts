import { IReactComponents } from "@rxdrag/react-shared";
import { ComponentsContext } from "../contexts";
import { useContext } from "react";

export function useComponents() {
  const params = useContext<IReactComponents>(ComponentsContext)

  return params
}