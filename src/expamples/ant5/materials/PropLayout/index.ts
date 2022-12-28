import { IComponentMaterial } from "core-react";
import { colIcon } from "./icon";
import { proLayoutLocales, proLayoutResourceLocales } from "./locales";
import { prosLayoutSchema } from "./schema";
import { HeaderMaterial } from "../Header";
import { FooterMaterial } from "../Footer";
import { ContentMaterial } from "../Content";
import { ProLayout } from "expamples/ant5/components/ProLayout";
import { SiderMaterial } from "../Sider";

const name = "ProLayout"
export const ProLayoutMaterial: IComponentMaterial = {
  componentName: name,
  component: ProLayout,
  designer: ProLayout,
  designerLocales: proLayoutLocales,
  designerSchema: prosLayoutSchema,
  resource: {
    name: name,
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
  icon: colIcon,
  color: "#dfa324",
  resourceLocales: proLayoutResourceLocales,
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
