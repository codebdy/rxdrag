import { IReactComponents } from "@rxdrag/react-shared";
import { ComponentDesignersContext } from "../contexts";
import { useContext } from "react";

export function useComponentDesigners() {
  const params = useContext<IReactComponents>(ComponentDesignersContext)

  return params
}