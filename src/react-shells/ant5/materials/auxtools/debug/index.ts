import { debugIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { Debug } from "./reaction";
import { debugSchema } from "./schema";

export const debugMaterial: IReactionMaterial = {
  name: "debug",
  icon: debugIcon,
  label: "$debug",
  reactionType: ReactionType.SingleReaction,
  color: "orange",
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: debugSchema,
  reaction: Debug,
}