import { useContext } from "react";
import { UrlsContext } from "../contexts";

export function useCanvasUrl(){
  return useContext(UrlsContext)?.canvasUrl
}