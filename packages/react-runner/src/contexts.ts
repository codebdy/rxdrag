import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import {Controllers} from "@rxdrag/minions"
import { IComponentsParams } from "./interfaces";
import { IComponents } from "@rxdrag/react-shared";

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