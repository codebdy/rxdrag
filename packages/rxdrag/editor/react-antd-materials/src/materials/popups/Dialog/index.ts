import { IMaterial } from "@rxdrag/react-core";
import { DialogFooterMaterial } from "../DialogFooter";
import { DialogTitleMaterial } from "../DialogTitle";
import { DialogDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";
import { Dialog } from "@rxdrag/react-antd-components";

const name = "Dialog"
export const DialogMaterial: IMaterial = {
  componentName: name,
  component: Dialog,
  designer: DialogDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    open: true,
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
            children: [
              {
                componentName: "Text",
                props: {
                  value: name,
                }
              }
            ]
          },
          footer: {
            componentName: "DialogFooter",
          },
        },
      }
    ]
  },
  slots: {
    title: DialogTitleMaterial,
    footer: DialogFooterMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  },
  controller: {
    props: [
      {
        name: "open",
        label: "$open",
      }
    ],
    events: [
      {
        name: "onOpen",
        label: "$onOpen",
      },
      {
        name: "onClose",
        label: "$onClose",
      },
    ],
    reactions:[
      {
        name: "open",
        label: "$open",
      },
      {
        name: "close",
        label: "$close",
      }
    ]
  }
}