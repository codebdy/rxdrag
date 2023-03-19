import { Popover } from "antd";
import { IComponentMaterial } from "core-react";
import { DefaultSlotMaterial } from "../../slots/DefualtSlot";
import { TextMaterial } from "../../displays/typography/Text";
import { PopoverDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Popover"
export const PopoverMaterial: IComponentMaterial = {
  componentName: name,
  component: Popover,
  designer: PopoverDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
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
        slots: {
          title: {
            componentName: "Text",
            props: {
              content: "Popover Title",
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