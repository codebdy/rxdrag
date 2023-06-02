import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { readFormValueMaterial } from "./PaginationQuery";

export const httpQueryMaterialCategory: ActivityMaterialCategory<ReactNode>=   {
  name: '$dataSource',
  materials: [
    readFormValueMaterial
  ],
}
