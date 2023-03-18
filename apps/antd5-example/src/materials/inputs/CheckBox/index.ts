import { IComponentMaterial } from "@rxdrag/react-core";
import { Checkbox } from "components/inputs/Checkbox";
import { checkboxIcon } from "./icon";
import { checkboxLocales, checkBoxResourceLocales } from "./locales";
import { selectSchema } from "./schema";

const name = "Checkbox"
export const CheckboxMaterial: IComponentMaterial = {
  componentName: name,
  component: Checkbox,
  designer: Checkbox,
  designerLocales: checkboxLocales,
  designerSchema: selectSchema,
  designerProps: {
    //readOnly: true,
  },
  resource: {
    name: name,
    resourceLocales: checkBoxResourceLocales,
    icon: checkboxIcon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
      }
    ]
  },
}