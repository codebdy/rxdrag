import { Table } from "antd";
import { IComponentMaterial } from "core-react";
import { TableColumnDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "TableColumn"
export const TableColumnMaterial: IComponentMaterial = {
  componentName: name,
  component: Table.Column,
  designer: TableColumnDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#0EDB77",
    elements: [
      {
        componentName: name,
        props: {
          title: "Column"
        }
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}