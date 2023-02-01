import { IReactionMaterial } from "runner/reaction/interfaces/material";
import { ReactionType } from "runner/reaction/interfaces/metas";
import { infoIcon, jsIcon, loadingIcon, routeIcon, simulateIcon } from "../icons/reactions";

export const commonReactions: IReactionMaterial[] = [
  {
    name: "routeTo",
    icon: routeIcon,
    label: "$routeTo",
    reactionType: ReactionType.SingleReaction,
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
  {
    name: "infoMessage",
    icon: infoIcon,
    label: "$infoMessage",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
      ],
    },
  },
  {
    name: "simulateData",
    icon: simulateIcon,
    label: "$simulateData",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
        {
          name: "output",
          label: "",
          group: "out",
        },
      ],
    }
  },
  {
    name: "globalLoading",
    icon: loadingIcon,
    label: "$globalLoading",
    reactionType: ReactionType.SingleReaction,
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
  {
    name: "jsCode",
    icon: jsIcon,
    label: "$jsCode",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "input",
          label: "",
          group: "in",
        },
        {
          name: "output",
          label: "",
          group: "out",
        },
      ],
    }
  },
]