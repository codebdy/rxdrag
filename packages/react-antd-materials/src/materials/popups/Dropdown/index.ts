import { Dropdown } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { ButtonMaterial } from "../../Button";
import { DropdownMenuItemMaterial } from "../DropdownMenuItem";
import { DropdownDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Dropdown"
export const DropdownMaterial: IMaterial = {
  componentName: name,
  component: Dropdown,
  designer: DropdownDesigner,
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
        slots: {
          actionComponent: {
            componentName: "Button",
            props: {
              title: name,
            },
          }
        },
      }
    ]
  },
  slots: {
    actionComponent: ButtonMaterial,
    menuItem: DropdownMenuItemMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}