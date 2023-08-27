import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import { Controllers, IController } from "@rxdrag/minions-runtime-react";
import { RuntimeEngine } from "./RuntimeRoot/RuntimeEngine";
import { IReactComponents } from "@rxdrag/react-shared";

export const EmpertyControllers: Controllers = {}
export const PreviewComponentsContext = createContext<IReactComponents>({})
export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllersContext = createContext<Controllers>(EmpertyControllers)
export const ControllerContext = createContext<IController | undefined>(undefined)
export const RuntimeEngineContext = createContext<RuntimeEngine | undefined>(undefined)
