import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";
import {Controllers} from "@rxdrag/minions"

export const EmpertyControllers: Controllers = {}

export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllersContext = createContext<Controllers>(EmpertyControllers)

