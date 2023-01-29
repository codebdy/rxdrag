import { List } from "antd";
import { IComponentMaterial } from "core-react";
import { AvatarMaterial } from "../../displays/Avatar";
import { TextViewMaterial } from "../../displays/TextView";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "ListItemMeta"
export const ListItemMetaMaterial: IComponentMaterial = {
  componentName: name,
  component: List.Item.Meta,
  designer: List.Item.Meta,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
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
          avatar: {
            componentName: "Avatar"
          },
          title:{
            componentName:"TextView",
            props:{
              content:"Title"
            }
          },
          description:{
            componentName:"TextView",
            props:{
              content:"Description"
            }
          },
        }
      }
    ]
  },
  slots: {
    avatar: AvatarMaterial,
    title: TextViewMaterial,
    description: TextViewMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: false,
    noRef: true,
  }
}