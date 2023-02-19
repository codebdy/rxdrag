import { DesignComponentsContext, IDesignerComponentsParams } from "core-react/contexts";
import { useContext } from "react";

export function useDesignComponentsParams() {
  const params = useContext<IDesignerComponentsParams>(DesignComponentsContext)

  return params
}