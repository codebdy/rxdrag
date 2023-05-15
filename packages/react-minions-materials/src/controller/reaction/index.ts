import { methodIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ReactionType } from "@rxdrag/schema";
import { ControllerReaction } from "./factory";
import { ReactNode } from "react";

export const reactionMaterial: IActivityMaterial<ReactNode> = {
  name: "controllerReaction",
  icon: methodIcon,
  label: "reaction",
  reactionType: ReactionType.ControllerReaction,
  meta: {

  },
  reaction: ControllerReaction,
}
