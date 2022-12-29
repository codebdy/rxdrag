import { IComponentMaterial } from "core-react";
import { Avatar } from "expamples/ant5/components/Avatar";
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
    elements: [
      {
        componentName: name,
        props: {
        }
      }
    ]
  },
  icon: avatarIcon,
  color: "#dfa324",
  resourceLocales: avatarResourceLocales,
}
