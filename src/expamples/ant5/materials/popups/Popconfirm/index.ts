import { Popconfirm } from "antd";
import { IComponentMaterial } from "core-react";
import { ButtonMaterial } from "../../Button";
import { IconViewMaterial } from "../../IconView";
import { TextViewMaterial } from "../../TextView";
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
            componentName: "TextView",
            props: {
              content: "Delete the task",
            }
          },
          description: {
            componentName: "TextView",
            props: {
              content: "Are you sure to delete this task?",
            }
          },
          okText: {
            componentName: "TextView",
            props: {
              content: "Ok",
            }
          },
          cancelText: {
            componentName: "TextView",
            props: {
              content: "Cancel",
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
    description: TextViewMaterial,
    okText: TextViewMaterial,
    cancelText: TextViewMaterial,
    actionComponent: ButtonMaterial,
    icon: IconViewMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}