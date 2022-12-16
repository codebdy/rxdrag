import { createContext } from "react";
import { IComponentRenderSchema } from "./ComponentView";

export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)

