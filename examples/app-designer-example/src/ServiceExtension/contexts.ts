import { createContext } from "react";
import { MetaContent } from "@rxdrag/uml-editor";

export const MetaContext = createContext<MetaContent | undefined>(undefined)