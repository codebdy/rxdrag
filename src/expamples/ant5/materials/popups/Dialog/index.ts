import { IComponentMaterial } from "core-react";
import { Dialog } from "expamples/ant5/components/popups/Dialog";
import { ButtonMaterial } from "../../Button";
import { DialogContentMaterial } from "../DialogContent";
import { DialogFooterMaterial } from "../DialogFooter";
import { DialogTitleMaterial } from "../DialogTitle";
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
          title: {
            componentName: "DialogTitle",
            children:[
              {
                componentName:"TextView",
                props: {
                  content: name,
                }
              }
            ]
          },
          content: {
            componentName: "DialogContent",
          },
          footer: {
            componentName: "DialogFooter",
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
    title: DialogTitleMaterial,
    content: DialogContentMaterial,
    footer: DialogFooterMaterial,
    actionComponent: ButtonMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
  }
}