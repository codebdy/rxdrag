import { Radio } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { radioIcon } from "./icon";
import { radioLocales, radioResourceLocales } from "./locales";
import { radioSchema } from "./schema";

const name = "Radio"
export const RadioMaterial: IMaterial = {
  componentName: name,
  component: Radio,
  designer: Radio,
  designerLocales: radioLocales,
  propsSchema: radioSchema,
  designerProps: {
    //readOnly: true,
  },
  resource: {
    name: name,
    resourceLocales: radioResourceLocales,
    icon: radioIcon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
      }
    ]
  }
}