import { methodIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { ControllerReaction } from "./factory";
import { ReactNode } from "react";

export const reactionMaterial: IReactionMaterial<ReactNode> = {
  name: "controllerReaction",
  icon: methodIcon,
  label: "reaction",
  reactionType: ReactionType.ControllerReaction,
  meta: {

  },
  reaction: ControllerReaction,
}
