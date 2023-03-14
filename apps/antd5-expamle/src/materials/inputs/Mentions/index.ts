import { Mentions } from "antd";
import { IComponentMaterial } from "core-react";
import { inputLocales } from "../Input/locales";
import { mentionsIcon } from "./icon";
import { mentionsResourceLocales } from "./locales";
import { inputNumberSchema } from "./schema";

const name = "Mentions"
export const MentionsMaterial: IComponentMaterial = {
  componentName: name,
  component: Mentions,
  designer: Mentions,
  designerLocales: inputLocales,
  designerSchema: inputNumberSchema,
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