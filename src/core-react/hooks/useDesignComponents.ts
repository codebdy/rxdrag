import { DesignComponentsContext, IComponentsParams } from "core-react/contexts";
import { useContext } from "react";

export function useDesignComponents() {
  const params = useContext<IComponentsParams>(DesignComponentsContext)

  return params
}