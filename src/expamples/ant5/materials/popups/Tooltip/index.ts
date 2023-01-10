import { Tooltip } from "antd";
import { IComponentMaterial } from "core-react";
import { TextViewMaterial } from "../../displays/TextView";
import { TooltipDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Tooltip"
export const TooltipMaterial: IComponentMaterial = {
  componentName: name,
  component: Tooltip,
  designer: TooltipDesigner,
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
              content: "prompt text",
            }
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
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}