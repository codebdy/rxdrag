import { colIcon } from "./icon";
import { twoColumnLayoutLocales, twoColumnLayoutResourceLocales } from "./locales";
import { HeaderMaterial } from "../Header";
import { FooterMaterial } from "../Footer";
import { ContentMaterial } from "../Content";
import { SiderMaterial } from "../Sider";
import { prosLayoutSchema } from "./schema";
import { IComponentMaterial } from "@rxdrag/react-core";
import { TwoColumnLayout } from "components/layouts/TowColumnLayout";

const name = "TwoColumnLayout"
export const TwoColumnLayoutMaterial: IComponentMaterial = {
  componentName: name,
  component: TwoColumnLayout,
  designer: TwoColumnLayout,
  designerLocales: twoColumnLayoutLocales,
  designerSchema: prosLayoutSchema,
  resource: {
    name: name,
    icon: colIcon,
    color: "#dfa324",
    resourceLocales: twoColumnLayoutResourceLocales,
    elements: [
      {
        componentName: name,
        props: {

        },
        slots: {
          header: {
            componentName: "Layout.Header",
            props: {
            }
          },
          sider: {
            componentName: "Layout.Sider",
            props: {
            }
          },
          content: {
            componentName: "Layout.Content",
            props: {
            }
          },
          footer: {
            componentName: "Layout.Footer",
            props: {
            }
          }
        }
      }
    ]
  },

  behaviorRule: {
    droppable: false,
  },
  slots: {
    header: HeaderMaterial,
    sider: SiderMaterial,
    content: ContentMaterial,
    footer: FooterMaterial,
  },
}
