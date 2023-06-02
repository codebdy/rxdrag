import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { dataQueryMaterial } from "./DataQuery";

export const httpQueryMaterialCategory: ActivityMaterialCategory<ReactNode>=   {
  name: '$dataSource',
  materials: [
    dataQueryMaterial
  ],
}
