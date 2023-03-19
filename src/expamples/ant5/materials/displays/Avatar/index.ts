import { Avatar } from "antd";
import { IComponentMaterial } from "core-react";
import { IconViewMaterial } from "../IconView";
import { avatarIcon } from "./icon";
import { avatarLocales, avatarResourceLocales } from "./locales";
import { avatarSchema } from "./schema";

const name = "Avatar"
export const AvatarMaterial: IComponentMaterial = {
  componentName: name,
  component: Avatar,
  designer: Avatar,
  designerLocales: avatarLocales,
  designerSchema: avatarSchema,
  resource: {
    name: name,
    icon: avatarIcon,
    color: "#0EDB77",
    resourceLocales: avatarResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
        }
      }
    ]
  },
  slots: {
    icon: IconViewMaterial,
  },
  behaviorRule:{
    noRef: true,
    droppable: true,
    noPlaceholder: true,
  }
}
