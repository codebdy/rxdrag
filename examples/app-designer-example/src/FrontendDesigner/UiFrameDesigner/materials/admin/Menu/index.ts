import { IMaterial } from "@rxdrag/react-core";
import { logoIcon } from "./icon";
import { menuLocales, logoResourceLocales } from "./locales";
import { schema } from "./schema";
import { Menu } from "../../../../components/admin/Menu";
import { MenuSelect } from "./setters/MenuSelect";

const name = "Menu"
export const MenuMaterial: IMaterial = {
  componentName: name,
  component: Menu,
  designer: Menu,
  designerLocales: menuLocales,
  propsSchema: schema,
  setters:{
    MenuSelect
  },
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
