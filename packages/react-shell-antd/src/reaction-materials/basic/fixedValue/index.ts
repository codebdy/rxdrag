import { fixedValueIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { FixedValue } from "./reaction";
import { fixedValueSchema } from "./schema";

export const fixedValueMaterial: IReactionMaterial = {
  name: "fixedValue",
  icon: fixedValueIcon,
  label: "$fixedValue",
  reactionType: ReactionType.SingleReaction,
  color: "#1668dc",
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
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
  schema: fixedValueSchema,
  reaction: FixedValue,
}