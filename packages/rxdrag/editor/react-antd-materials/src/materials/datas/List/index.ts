import { List } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { FooterMaterial } from "../../common/Footer";
import { HeaderMaterial } from "../../common/Header";
import { ListItemMaterial } from "../ListItem";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "List"
export const ListMaterial: IMaterial = {
  componentName: name,
  component: List,
  designer: List,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    dataSource: { nodes: [{ id: "temp" }] }
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
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
                    componentName: "Text",
                    props: {
                      value: "Title"
                    }
                  },
                  description: {
                    componentName: "Text",
                    props: {
                      value: "Description"
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
        }
      }
    ]
  },
  slots: {
    renderItem: ListItemMaterial,
    header: HeaderMaterial,
    footer: FooterMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: false,
    noRef: true,
  },
  logicalProps: ["dataSource"]
}