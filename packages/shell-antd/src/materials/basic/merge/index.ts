import { mergeIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { Merge } from "./reaction";
import { mergeSchema } from "./schema";

export const mergeMaterial: IReactionMaterial = {
  name: "merge",
  icon: mergeIcon,
  label: "$merge",
  reactionType: ReactionType.SingleReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input0",
        label: "input 0",
      },
      {
        id: createUuid(),
        name: "input1",
        label: "input 1",
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
  schema: mergeSchema,
  reaction: Merge,
}