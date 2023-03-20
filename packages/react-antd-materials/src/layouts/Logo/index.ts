import { Logo } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { logoIcon } from "./icon";
import { logoLocales, logoResourceLocales } from "./locales";
import { logoSchema } from "./schema";

const name = "Logo"
export const LogoMaterial: IComponentMaterial = {
  componentName: name,
  component: Logo,
  designer: Logo,
  designerLocales: logoLocales,
  designerSchema: logoSchema,
  resource: {
    name: name,
    icon: logoIcon,
    color: "#3E2AD1",
    resourceLocales: logoResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },

}
