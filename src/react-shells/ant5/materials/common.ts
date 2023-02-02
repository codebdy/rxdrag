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
      inPorts: [
        {
          name: "input",
          label: "",
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
      inPorts: [
        {
          name: "input",
          label: "",
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
      inPorts: [
        {
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          name: "output",
          label: "",
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
      inPorts: [
        {
          name: "input",
          label: "",
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
      inPorts: [
        {
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          name: "output",
          label: "",
        },
      ],
    }
  },
]