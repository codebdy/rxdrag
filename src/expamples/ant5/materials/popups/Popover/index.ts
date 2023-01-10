import { Popover } from "antd";
import { IComponentMaterial } from "core-react";
import { TextViewMaterial } from "../../displays/TextView";
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
            componentName: "TextView",
            props: {
              content: "Delete the task",
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
            children: [
              {
                componentName: "TextView",
                props: {
                  content: name,
                }
              }
            ]
          }
        ]
      }
    ]
  },
  slots: {
    title: TextViewMaterial,
    content: TextViewMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}