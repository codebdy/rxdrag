import { Table } from "antd";
import { IComponentMaterial } from "core-react";
import { TableSummary } from "expamples/ant5/components/datas/TableSummary";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "TableSummary"
export const TableSummaryMaterial: IComponentMaterial = {
  componentName: name,
  component: Table.Summary,
  designer: TableSummary,
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