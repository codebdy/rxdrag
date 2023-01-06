import { Dropdown } from "antd";
import { IComponentMaterial } from "core-react";
import { ButtonMaterial } from "../../Button";
import { DropdownDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Dropdown"
export const DropdownMaterial: IComponentMaterial = {
  componentName: name,
  component: DropdownDesigner,
  designer: DropdownDesigner,
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
          actionComponent: {
            componentName: "Button",
            children: [
              {
                componentName: "TextView",
                props: {
                  content: name,
                }
              }
            ]
          },
          menu: {
            componentName: "DefaultSlot"
          }
        }
      }
    ]
  },
  slots: {
    actionComponent: ButtonMaterial,
    menu: true,
  },
}