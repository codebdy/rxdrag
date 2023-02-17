import { IComponentMaterial } from "core-react";
import { List } from "expamples/ant5/components/datas/List";
import { FooterMaterial } from "../../common/Footer";
import { HeaderMaterial } from "../../common/Header";
import { ListItemMaterial } from "../ListItem";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "List"
export const ListMaterial: IComponentMaterial = {
  componentName: name,
  component: List,
  designer: List,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    dataSource: { nodes: [{}] }
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
                      content: "Title"
                    }
                  },
                  description: {
                    componentName: "Text",
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
  }
}