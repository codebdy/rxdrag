import { ifIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { Condition } from "./reaction";
import { conditionSchema } from "./schema";

export const conditionMaterial: IReactionMaterial = {
  name: "condition",
  icon: ifIcon,
  label: "$conditionCheck",
  reactionType: ReactionType.SingleReaction,
  color: "#5e76c3",
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$inputCondition",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "true",
        label: "$true",
      },
      {
        id: createUuid(),
        name: "false",
        label: "$false",
      },
    ],
  },
  schema: conditionSchema,
  reaction: Condition,
}