import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import { IController } from "@rxdrag/minions-runtime-react";
import { ControllerEngine } from "./RuntimeRoot/ControllerEngine";
import { IReactComponents } from "@rxdrag/react-shared";

export const PreviewComponentsContext = createContext<IReactComponents>({})
export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllerContext = createContext<IController | undefined>(undefined)
export const ControllerEngineContext = createContext<ControllerEngine | undefined>(undefined)
