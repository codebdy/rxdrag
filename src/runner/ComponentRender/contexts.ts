import { createContext } from "react";
import { ComponentControllers } from "runner/minions";
import { IComponentRenderSchema } from "./ComponentView";

export const EmpertyControllers: ComponentControllers = {}

export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ControllersContext = createContext<ComponentControllers>(EmpertyControllers)

