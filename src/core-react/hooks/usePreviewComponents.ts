import { IComponentsParams, PreviewComponentsContext } from "core-react/contexts";
import { useContext } from "react";

export function usePreviewComponents(){
  const params = useContext<IComponentsParams>(PreviewComponentsContext)

  return params
}