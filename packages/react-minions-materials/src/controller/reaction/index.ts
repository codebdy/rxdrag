import { methodIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { ControllerReaction } from "./factory";
import { ReactNode } from "react";

export const activityMaterial: IActivityMaterial<ReactNode> = {
  name: "controllerReaction",
  icon: methodIcon,
  label: "reaction",
  activityType: ActivityType.ControllerReaction,
  meta: {

  },
  reaction: ControllerReaction,
}
