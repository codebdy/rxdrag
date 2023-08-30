import { useContext } from "react";
import { UrlsContext } from "../contexts";

export function usePreviewUrl() {
  return useContext(UrlsContext)?.previewUrl
}