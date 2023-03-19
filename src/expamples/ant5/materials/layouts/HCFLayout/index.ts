import { IComponentMaterial } from "core-react";
import { colIcon } from "./icon";
import { hCFLayoutLocales, hCFLayoutResourceLocales } from "./locales";
import { hCFLayoutSchema } from "./schema";
import { HCFLayout } from "expamples/ant5/components/layouts/HCFLayout";
import { HeaderMaterial } from "../Header";
import { FooterMaterial } from "../Footer";
import { ContentMaterial } from "../Content";

const name = "HCFLayout"
export const HCFLayoutMaterial: IComponentMaterial = {
  componentName: name,
  component: HCFLayout,
  designer: HCFLayout,
  designerLocales: hCFLayoutLocales,
  designerSchema: hCFLayoutSchema,
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
    header: HeaderMaterial,
    content: ContentMaterial,
    footer: FooterMaterial,
  },
}
