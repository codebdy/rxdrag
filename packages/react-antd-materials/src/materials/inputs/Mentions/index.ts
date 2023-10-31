import { IMaterial } from "@rxdrag/react-core";
import { Mentions } from "antd";
import { inputLocales } from "../Input/locales";
import { mentionsIcon } from "./icon";
import { mentionsResourceLocales } from "./locales";
import { inputNumberSchema } from "./schema";

const name = "Mentions"
export const MentionsMaterial: IMaterial = {
  componentName: name,
  component: Mentions,
  designer: Mentions,
  designerLocales: inputLocales,
  propsSchema: inputNumberSchema,
  designerProps: {
    readOnly: true,
    style: {
      cursor: "default",
    }
  },
  resource: {
    name: name,
    resourceLocales: mentionsResourceLocales,
    icon: mentionsIcon,
    color: "#F5A623",
    elements: [
      {
        componentName: name
      }
    ],
  },
}