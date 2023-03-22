import { methodIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
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
