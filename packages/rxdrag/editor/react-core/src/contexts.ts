import { IDesignerEngine, IDocument, ITreeNode } from "@rxdrag/core";
import { createContext } from "react";
import { IComponentsParams, initialParams } from "@rxdrag/react-runner";



export const initialDesignerParams: IComponentsParams = {
  ...initialParams,
}

export const DesignerEngineContext = createContext<IDesignerEngine | undefined>(undefined)
//IFrame中的Component不能跟engine中一套，所以必须要单独处理
export const DesignComponentsContext = createContext<IComponentsParams>(initialDesignerParams)
export const DocumentContext = createContext<IDocument | undefined>(undefined)
export const NodeContext = createContext<ITreeNode | undefined>(undefined)
export const LockContext = createContext<boolean | undefined>(undefined)
