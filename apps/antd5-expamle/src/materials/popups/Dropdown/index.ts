import { IComponentMaterial } from "core-react";
import { Dropdown } from "expamples/ant5/components/popups/Dropdown";
import { ButtonMaterial } from "../../Button";
import { DropdownMenuItemMaterial } from "../DropdownMenuItem";
import { DropdownDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Dropdown"
export const DropdownMaterial: IComponentMaterial = {
  componentName: name,
  component: Dropdown,
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