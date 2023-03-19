import { Popconfirm } from "antd";
import { IComponentMaterial } from "core-react";
import { ButtonMaterial } from "../../Button";
import { IconViewMaterial } from "../../displays/IconView";
import { TextMaterial } from "../../displays/typography/Text";
import { PopconfirmDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Popconfirm"
export const PopconfirmMaterial: IComponentMaterial = {
  componentName: name,
  component: Popconfirm,
  designer: PopconfirmDesigner,
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
              value: "Delete the task",
            }
          },
          description: {
            componentName: "Text",
            props: {
              value: "Are you sure to delete this task?",
            }
          },
          okText: {
            componentName: "Text",
            props: {
              value: "Ok",
            }
          },
          cancelText: {
            componentName: "Text",
            props: {
              value: "Cancel",
            }
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
    description: TextMaterial,
    okText: TextMaterial,
    cancelText: TextMaterial,
    actionComponent: ButtonMaterial,
    icon: IconViewMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}