import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import { IComponentsParams } from "./interfaces";
import { IComponents } from "@rxdrag/react-shared";
import { Controllers } from "@rxdrag/minions-runtime-react";

export const EmpertyControllers: Controllers = {}

export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllersContext = createContext<Controllers>(EmpertyControllers)

export const initialParams: IComponentsParams = {
  components: {},
  registerComponents: function (...components: IComponents[]): void {
    throw new Error("Function not implemented.");
  }
}

export const PreviewComponentsContext = createContext<IComponentsParams>(initialParams)
