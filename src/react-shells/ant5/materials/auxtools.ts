import { ReactionType } from "runner/reaction/interfaces/metas";
import { IReactionMaterial } from "../../../runner/reaction/interfaces/material";
import { debugIcon } from "../icons/reactions";
import { createUuid } from "../SettingsForm/components/ReactionsInput/ReactionsEditor/utils";

export const auxReactions: IReactionMaterial[] = [
  {
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
    }
  },
]