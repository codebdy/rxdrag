import { createContext } from "react";

export interface IUrls {
  canvasUrl?: string,
  previewUrl?: string,
}
export const UrlsContext = createContext<IUrls | undefined>(undefined)