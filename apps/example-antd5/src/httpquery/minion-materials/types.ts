import { IActivityMaterial } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { ReactNode } from "react";

export type IQueryActivityMaterial<Config = unknown> = IActivityMaterial<ReactNode, INodeSchema, Config>