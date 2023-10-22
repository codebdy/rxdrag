import { Table } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { FooterMaterial } from "../../common/Footer";
import { HeaderMaterial } from "../../common/Header";
import { TableSummaryMaterial } from "../TableSummary";
import { TableDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Table"
export const TableMaterial: IMaterial = {
  componentName: name,
  component: Table,
  designer: TableDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#0EDB77",
    elements: [
      {
        componentName: name,
        "x-data": {
          type: "array",
        },
        slots: {
        },
        children: [
          {
            componentName: 'TableColumn',
            props: {
              title: "Column1"
            }
          },
          {
            componentName: 'TableColumn',
            props: {
              title: "Column2"
            }
          },
          {
            componentName: 'TableColumn',
            props: {
              title: "Column3"
            }
          },
        ],
        selfRender: true,
      }
    ]
  },
  slots: {
    header: HeaderMaterial,
    footer: FooterMaterial,
    summary: TableSummaryMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  },
  controller: {
    props: [
      {
        name: "dataSource",
        label: "$dataSource"
      },
    ],
    events: [
      {
        name: "onInit",
        label: "$onInit",
      },
      {
        name: "onPageChange",
        label: "$onPageChange",
      }
    ],
    reactions: [
      {
        name: "setDataSource",
        label: "$setDataSource",
      }
    ]
  }
}