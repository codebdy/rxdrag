import { createContext } from "react";
import { Reactions } from "runner/reaction/interfaces/interfaces";
import { IComponentRenderSchema } from "./ComponentView";

export const EmpertyReactions: Reactions = {}

export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ReactionsContext = createContext<Reactions>(EmpertyReactions)

