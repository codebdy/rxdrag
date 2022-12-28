import { createContext, useContext } from "react";

export interface ILayoutContextParams {
  collapsed?: boolean
  setCollapsed?: (collapsed?: boolean | ((collapsed?: boolean) => boolean)) => void
  scrolled?: boolean
  setScrolled?: (scroll?: boolean| ((scroll?: boolean) => boolean)) => void
}
export const LayoutContext = createContext<ILayoutContextParams>({} as any);

export const useLayoutParams = (): ILayoutContextParams | undefined => useContext(LayoutContext);