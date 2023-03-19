import { IComponentMaterial } from "core-react";
import { colIcon } from "./icon";
import { twoColumnLayoutLocales, twoColumnLayoutResourceLocales } from "./locales";
import { HeaderMaterial } from "../Header";
import { FooterMaterial } from "../Footer";
import { ContentMaterial } from "../Content";
import { SiderMaterial } from "../Sider";
import { TwoColumnLayout } from "expamples/ant5/components/layouts/TowColumnLayout";
import { prosLayoutSchema } from "./schema";

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
