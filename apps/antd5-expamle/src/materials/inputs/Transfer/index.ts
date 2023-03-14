import { IComponentMaterial } from "core-react";
import { Transfer } from "expamples/ant5/components/inputs/Transfer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Transfer"
export const TransferMaterial: IComponentMaterial = {
  componentName: name,
  component: Transfer,
  designer: Transfer,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
      }
    ]
  },
}