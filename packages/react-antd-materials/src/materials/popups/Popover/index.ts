import { Popover } from "antd";
import { DefaultSlotMaterial } from "../../slots/DefualtSlot";
import { TextMaterial } from "../../displays/typography/Text";
import { PopoverDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";
import { IMaterial } from "@rxdrag/react-core";

const name = "Popover"
export const PopoverMaterial: IMaterial = {
  componentName: name,
  component: Popover,
  designer: PopoverDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
        props: {
          trigger: "click",
        },
        slots: {
          title: {
            componentName: "Text",
            props: {
              value: "Popover Title",
            }
          },
          content: {
            componentName: "DefaultSlot",
          },
        },
        children: [
          {
            componentName: "Button",
            props: {
              title: name,
            },
          }
        ]
      }
    ]
  },
  slots: {
    title: TextMaterial,
    content: DefaultSlotMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}