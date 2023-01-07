import { IComponentMaterial } from "core-react";
import { Dialog } from "expamples/ant5/components/popups/Dialog";
import { ButtonMaterial } from "../../Button";
import { DropdownMenuMaterial } from "../DropdownMenu";
import { DialogDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Dialog"
export const DialogMaterial: IComponentMaterial = {
  componentName: name,
  component: Dialog,
  designer: DialogDesigner,
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
          menu: {
            componentName: "DropdownMenu"
          },
          actionComponent: {
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
  },
  slots: {
    menu: DropdownMenuMaterial,
    actionComponent: ButtonMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
    noRef: true
  }
}