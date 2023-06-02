import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { dataQueryMaterial } from "./DataQuery";
import { dataQuery2Material } from "./DataQuery2";

export const httpQueryMaterialCategory: ActivityMaterialCategory<ReactNode>=   {
  name: '$dataSource',
  materials: [
    dataQueryMaterial,
    dataQuery2Material
  ],
}
