import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import { IController } from "@rxdrag/minions-runtime-react";
import { ControllerEngine } from "./RuntimeRoot/ControllerEngine";
import { IReactComponents } from "@rxdrag/react-shared";

export const EmpertyControllers: Record<string, IController> = {}
export const PreviewComponentsContext = createContext<IReactComponents>({})
export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllersContext = createContext<Record<string, IController>>(EmpertyControllers)
export const ControllerContext = createContext<IController | undefined>(undefined)
export const ControllerEngineContext = createContext<ControllerEngine | undefined>(undefined)
