import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import { IComponentsParams } from "./interfaces";
import { Controllers, IController } from "@rxdrag/minions-runtime-react";
import { RuntimeEngine } from "./RuntimeRoot/RuntimeEngine";

export const EmpertyControllers: Controllers = {}

export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllersContext = createContext<Controllers>(EmpertyControllers)
export const ControllerContext = createContext<IController | undefined>(undefined)
export const RuntimeEngineContext = createContext<RuntimeEngine | undefined>(undefined)

export const initialParams: IComponentsParams = {
  components: {},
}

export const PreviewComponentsContext = createContext<IComponentsParams>(initialParams)
