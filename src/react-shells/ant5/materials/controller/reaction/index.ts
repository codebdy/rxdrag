import { methodIcon } from "react-shells/ant5/icons/reactions";
import { IReactionMaterial, ReactionType } from "runner/reaction";
import { ControllerReaction } from "./factory";

export const reactionMaterial: IReactionMaterial = {
  name: "controllerReaction",
  icon: methodIcon,
  label: "reaction",
  reactionType: ReactionType.ControllerReaction,
  meta: {

  },
  reaction: ControllerReaction,
}
