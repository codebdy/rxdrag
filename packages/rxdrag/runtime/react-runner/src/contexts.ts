import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import { IController } from "@rxdrag/minions-runtime-react";
import { IReactComponents } from "@rxdrag/react-shared";
import { ControllerEngine } from "./LogicflowRuntime/ControllerEngine";

export const PreviewComponentsContext = createContext<IReactComponents>({})
export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllerContext = createContext<IController | undefined>(undefined)
export const ControllerEngineContext = createContext<ControllerEngine | undefined>(undefined)
