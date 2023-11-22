import { IMaterial } from "@rxdrag/react-core";
import { AutoComplete } from "antd";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "AutoComplete"
export const AutoCompleteMaterial: IMaterial = {
  componentName: name,
  component: AutoComplete,
  designer: AutoComplete,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    // readOnly: true,
    // inputReadOnly: true,
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