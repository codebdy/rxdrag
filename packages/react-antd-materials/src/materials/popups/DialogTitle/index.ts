import { DialogTitle } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DialogTitle"
export const DialogTitleMaterial: IMaterial = {
  componentName: name,
  component: DialogTitle,
  designer: DialogTitle,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  resource: {
    name: name,
    elements: [
      {
        componentName: name,
        children: [
          {
            componentName: "Text",
            props: {
              value: name,
            }
          }
        ]
      }
    ],
  },

  behaviorRule: {
    droppable: true,
  }
}