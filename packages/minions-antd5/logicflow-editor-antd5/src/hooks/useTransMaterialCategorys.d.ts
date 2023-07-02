import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
export declare function useTransMaterialCategorys(categories: ActivityMaterialCategory<ReactNode>[]): {
    name: string;
    materials: import("@rxdrag/minions-schema").IActivityMaterial<ReactNode, unknown, unknown, unknown>[];
}[];
