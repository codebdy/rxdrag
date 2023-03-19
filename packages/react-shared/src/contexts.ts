import { createContext } from "react";
import { IComponentsParams } from "./interfaces";
import { IComponents } from "./types";

export const initialParams: IComponentsParams = {
  components: {},
  registerComponents: function (...components: IComponents[]): void {
    throw new Error("Function not implemented.");
  }
}

export const PreviewComponentsContext = createContext<IComponentsParams>(initialParams)