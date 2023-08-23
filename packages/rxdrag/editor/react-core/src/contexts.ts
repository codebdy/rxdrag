import { IDesignerEngine, IDocument, ITreeNode } from "@rxdrag/core";
import { createContext } from "react";
import { IReactComponents } from "@rxdrag/react-shared";

export const DesignerEngineContext = createContext<IDesignerEngine | undefined>(undefined)
//IFrame中的Component不能跟engine中一套，所以必须要单独处理
export const ComponentsContext = createContext<IReactComponents>({})
export const DocumentContext = createContext<IDocument | undefined>(undefined)
export const NodeContext = createContext<ITreeNode | undefined>(undefined)
export const LockContext = createContext<boolean | undefined>(undefined)
