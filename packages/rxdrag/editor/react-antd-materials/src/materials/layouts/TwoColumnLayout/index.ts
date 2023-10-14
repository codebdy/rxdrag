import { colIcon } from "./icon";
import { twoColumnLayoutLocales, twoColumnLayoutResourceLocales } from "./locales";
import { ContentMaterial } from "../Content";
import { SiderMaterial } from "../Sider";
import { prosLayoutSchema } from "./schema";
import { IMaterial } from "@rxdrag/react-core";
import { TwoColumnLayout } from "@rxdrag/react-antd-components";
import { LayoutHeaderMaterial } from "../LayoutHeader";
import { LayoutFooterMaterial } from "../LayoutFooter";

const name = "TwoColumnLayout"
export const TwoColumnLayoutMaterial: IMaterial = {
  componentName: name,
  component: TwoColumnLayout,
  designer: TwoColumnLayout,
  designerLocales: twoColumnLayoutLocales,
  propsSchema: prosLayoutSchema,
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
    cloneable: false,
  },
  slots: {
    header: LayoutHeaderMaterial,
    sider: SiderMaterial,
    content: ContentMaterial,
    footer: LayoutFooterMaterial,
  },
}
