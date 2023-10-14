import { colIcon } from "./icon";
import { hCFLayoutLocales, hCFLayoutResourceLocales } from "./locales";
import { hCFLayoutSchema } from "./schema";
import { ContentMaterial } from "../Content";
import { IMaterial } from "@rxdrag/react-core";
import { HCFLayout } from "@rxdrag/react-antd-components";
import { LayoutHeaderMaterial } from "../LayoutHeader";
import { LayoutFooterMaterial } from "../LayoutFooter";

const name = "HCFLayout"
export const HCFLayoutMaterial: IMaterial = {
  componentName: name,
  component: HCFLayout,
  designer: HCFLayout,
  designerLocales: hCFLayoutLocales,
  propsSchema: hCFLayoutSchema,
  resource: {
    name: name,
    icon: colIcon,
    color: "#dfa324",
    resourceLocales: hCFLayoutResourceLocales,
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
    header: LayoutHeaderMaterial,
    content: ContentMaterial,
    footer: LayoutFooterMaterial,
  },
}
