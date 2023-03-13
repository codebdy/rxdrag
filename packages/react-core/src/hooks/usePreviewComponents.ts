import { IComponentsParams, PreviewComponentsContext } from "../contexts";
import { useContext } from "react";

export function usePreviewComponents(){
  const params = useContext<IComponentsParams>(PreviewComponentsContext)

  return params
}