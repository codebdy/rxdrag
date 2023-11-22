import { IMaterial } from "@rxdrag/react-core";
import { List } from "antd";
import { AvatarMaterial } from "../../displays/Avatar";
import { TextMaterial } from "../../displays/typography/Text";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "ListItemMeta"
export const ListItemMetaMaterial: IMaterial = {
  componentName: name,
  component: List.Item.Meta,
  designer: List.Item.Meta,
  designerLocales: locales,
  propsSchema: materialSchema,
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
            componentName:"Text",
            props:{
              value:"Title"
            }
          },
          description:{
            componentName:"Text",
            props:{
              value:"Description"
            }
          },
        }
      }
    ]
  },
  slots: {
    avatar: AvatarMaterial,
    title: TextMaterial,
    description: TextMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: false,
    noRef: true,
  }
}