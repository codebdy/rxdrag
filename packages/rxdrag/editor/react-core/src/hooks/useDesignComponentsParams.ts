import { IComponentsParams } from "@rxdrag/react-runner";
import { DesignComponentsContext } from "../contexts";
import { useContext } from "react";

export function useDesignComponentsParams() {
  const params = useContext<IComponentsParams>(DesignComponentsContext)

  return params
}