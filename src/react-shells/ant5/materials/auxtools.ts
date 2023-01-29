import { ReactionType } from "runner/reaction/interfaces/metas";
import { IReactionMaterial } from "../../../runner/reaction/interfaces/material";
import { debugIcon } from "../icons/reactions";

export const auxReactions: IReactionMaterial[] = [
  {
    name: "debug",
    icon: debugIcon,
    label: "$debug",
    reactionType: ReactionType.SingleReaction,
    color: "orange",
    meta: {
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
      ],
    }
  },
]