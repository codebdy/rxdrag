import { createContext, useContext } from "react";
import { IModule } from "../interfaces/module";

export const ModuleContext = createContext<IModule | undefined>(undefined)

export type ShowFrameState = [boolean, React.Dispatch<React.SetStateAction<boolean>>]
export const defaultShowFrameState: ShowFrameState = [true, () => { throw new Error("not implements") }]
export const ShowFrameContext = createContext<ShowFrameState>(defaultShowFrameState)

export function useShowFrameState() {
  return useContext(ShowFrameContext)
}