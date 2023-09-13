import { useContext } from "react";
import { PreviewComponentsContext } from "../contexts";

export function usePreviewComponents() {
  return useContext(PreviewComponentsContext)
}