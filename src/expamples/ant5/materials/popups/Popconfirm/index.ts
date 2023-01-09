import { IComponentMaterial } from "core-react";
import { Drawer } from "expamples/ant5/components/popups/Drawer";
import { ButtonMaterial } from "../../Button";
import { DrawerContentMaterial } from "../DrawerContent";
import { DrawerExtraMaterial } from "../DrawerExtra";
import { DrawerFooterMaterial } from "../DrawerFooter";
import { DrawerTitleMaterial } from "../DrawerTitle";
import { PopconfirmDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Popconfirm"
export const PopconfirmMaterial: IComponentMaterial = {
  componentName: name,
  component: Drawer,
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
            componentName: "DrawerTitle",
            children: [
              {
                componentName: "TextView",
                props: {
                  content: name,
                }
              }
            ]
          },
          extra: {
            componentName: "DrawerExtra",
          },
          content: {
            componentName: "DrawerContent",
          },
          footer: {
            componentName: "DrawerFooter",
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
    title: DrawerTitleMaterial,
    extra: DrawerExtraMaterial,
    content: DrawerContentMaterial,
    footer: DrawerFooterMaterial,
    actionComponent: ButtonMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
  }
}