import { IDesignerEngine, IDocument, ITreeNode } from "@rxdrag/core";
import { createContext } from "react";

export const DesignerEngineContext = createContext<IDesignerEngine | undefined>(undefined)
export const DocumentContext = createContext<IDocument | undefined>(undefined)
export const NodeContext = createContext<ITreeNode | undefined>(undefined)
export const LockContext = createContext<boolean | undefined>(undefined)
