import { IComponentMaterial } from "core-react";
import { List } from "expamples/ant5/components/datas/List";
import { FooterMaterial } from "../../common/Footer";
import { HeaderMaterial } from "../../common/Header";
import { ListItemMaterial } from "../ListItem";
import { TableSummaryMaterial } from "../TableSummary";
import { TableDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Table"
export const TableMaterial: IComponentMaterial = {
  componentName: name,
  component: List,
  designer: TableDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    dataSource: [{ key: "1" }]
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#0EDB77",
    elements: [
      {
        componentName: name,
        slots: {
          renderItem: {
            componentName: "ListItem",
            children: [
              {
                componentName: "ListItemMeta",
                slots: {
                  avatar: {
                    componentName: "Avatar"
                  },
                  title: {
                    componentName: "TextView",
                    props: {
                      content: "Title"
                    }
                  },
                  description: {
                    componentName: "TextView",
                    props: {
                      content: "Description"
                    }
                  },
                }
              }
            ],
            slots: {
              actions: {
                componentName: "ActionSlot"
              },
              extra: {
                componentName: "ExtraSlot"
              },
            }
          },
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
    renderItem: ListItemMaterial,
    header: HeaderMaterial,
    footer: FooterMaterial,
    summary: TableSummaryMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}