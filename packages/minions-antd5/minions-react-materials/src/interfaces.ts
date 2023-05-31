import { IActivityMaterial } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { ReactNode } from "react";

export type IRxDragActivityMaterial<SetPropConfig = unknown, MaterialContext = unknown> = IActivityMaterial<ReactNode, INodeSchema, SetPropConfig, MaterialContext>