import { IMaterial } from "@rxdrag/react-core";
import { Table } from "antd";
import { TableSummaryDesigner } from "./Designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "TableSummary"
export const TableSummaryMaterial: IMaterial = {
  componentName: name,
  component: Table.Summary,
  designer: TableSummaryDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
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