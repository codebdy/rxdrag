import { Table } from "antd";
import { IComponentMaterial } from "core-react";
import { TableSummaryDesigner } from "expamples/ant5/materials/datas/TableSummary/Designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "TableSummary"
export const TableSummaryMaterial: IComponentMaterial = {
  componentName: name,
  component: Table.Summary,
  designer: TableSummaryDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {

  },
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}