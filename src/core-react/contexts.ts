import { IDesignerEngine, IDocument, ITreeNode } from "core";
import { createContext } from "react";
import { IComponents } from "./interfaces";

export interface IComponentsParams {
  components: IComponents,
  registerComponents: (...components: IComponents[]) => void
}

export interface IDesignerComponentsParams extends IComponentsParams {
  tools: IComponents,
  registerTools: (...components: IComponents[]) => void
}

export const initialParams: IComponentsParams = {
  components: {},
  registerComponents: function (...components: IComponents[]): void {
    throw new Error("Function not implemented.");
  }
}

export const initialDesignerParams: IDesignerComponentsParams = {
  ...initialParams,
  tools: {},
  registerTools: function (...components: IComponents[]): void {
    throw new Error("Function not implemented.");
  }
}

export const DesignerEngineContext = createContext<IDesignerEngine | undefined>(undefined)
export const DesignComponentsContext = createContext<IDesignerComponentsParams>(initialDesignerParams)
export const PreviewComponentsContext = createContext<IComponentsParams>(initialParams)
export const DocumentContext = createContext<IDocument | undefined>(undefined)
export const NodeContext = createContext<ITreeNode | undefined>(undefined)
export const LockContext = createContext<boolean | undefined>(undefined)
