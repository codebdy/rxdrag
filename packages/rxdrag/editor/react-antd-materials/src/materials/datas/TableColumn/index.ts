import { TableColumn } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { TableColumnDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "TableColumn"
export const TableColumnMaterial: IMaterial = {
  componentName: name,
  component: TableColumn,
  designer: TableColumnDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
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