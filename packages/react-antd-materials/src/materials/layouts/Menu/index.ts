import { Menu } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { logoIcon } from "./icon";
import { menuLocales, logoResourceLocales } from "./locales";
import { menuSchema } from "./schema";

const name = "Menu"
export const MenuMaterial: IMaterial = {
  componentName: name,
  component: Menu,
  designer: Menu,
  designerLocales: menuLocales,
  propsSchema: menuSchema,
  resource: {
    name: name,
    icon: logoIcon,
    color: "#F5A623",
    resourceLocales: logoResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
}
