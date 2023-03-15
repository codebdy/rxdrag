import { useContext } from "react";
import { PreviewComponentsContext } from "./contexts";
import { IComponentsParams } from "./interfaces";

export function usePreviewComponents(){
  const params = useContext<IComponentsParams>(PreviewComponentsContext)

  return params
}