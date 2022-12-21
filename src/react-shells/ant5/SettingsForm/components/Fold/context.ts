import { createContext } from "react";

export interface IFoldParams {
  expand?: boolean,
  setExpand: (expand?: boolean | ((expand?: boolean) => boolean)) => void
}

const initialParams: IFoldParams = {
  setExpand: function (expand?: boolean | ((expand?: boolean | undefined) => boolean) | undefined): void {
    throw new Error("Function not implemented.");
  }
}

export const FoldContext = createContext<IFoldParams>(initialParams)