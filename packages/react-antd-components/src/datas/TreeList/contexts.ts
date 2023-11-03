import { createContext, useContext } from "react";

export type PopupParams = {
  node?: unknown,
  labelKey?: string,
  idKey?: string,
  open?: boolean,
  setOpen?: (open?: boolean) => void,
}

export const PopupContext = createContext<PopupParams | undefined>(undefined)

export function usePopupContext() {
  return useContext(PopupContext)
}