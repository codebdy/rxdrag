import { createContext } from "react";
import { IReaction } from "runner/reaction/interfaces/interfaces";
import { IComponentRenderSchema } from "./ComponentView";

export type Reactions = {
  [id: string]: IReaction | undefined
}

export const EmpertyReactions: Reactions = {}

export const ComponentSchemaContext = createContext<IComponentRenderSchema | undefined>(undefined)
export const ReactionsContext = createContext<Reactions>(EmpertyReactions)

