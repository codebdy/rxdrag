import { createContext } from "react";

export interface IReactionsEditorParams{

}
export const ReacionsEditorContext = createContext<IReactionsEditorParams | undefined>(undefined)