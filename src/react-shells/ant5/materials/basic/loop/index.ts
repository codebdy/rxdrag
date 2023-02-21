import { loopIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { Loop } from "./reaction";
import { loopSchema } from "./schema";

export const loopMaterial: IReactionMaterial = {
  name: "loop",
  icon: loopIcon,
  label: "$loop",
  reactionType: ReactionType.SingleReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$input",
      },

    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$output",
      },
    ],
  },
  schema: loopSchema,
  reaction: Loop,
}