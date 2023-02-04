import { IReactionMaterial } from "runner/reaction/interfaces/material";
import { ReactionType } from "runner/reaction/interfaces/metas";
import { infoIcon, jsIcon, loadingIcon, routeIcon, simulateIcon } from "../../icons/reactions";
import { createUuid } from "../../SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { jsCodeSchema } from "./schemas/jsCode";

export const commonReactions: IReactionMaterial[] = [
  {
    name: "routeTo",
    icon: routeIcon,
    label: "$routeTo",
    reactionType: ReactionType.SingleReaction,
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
  {
    name: "infoMessage",
    icon: infoIcon,
    label: "$infoMessage",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          id: createUuid(),
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
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          id: createUuid(),
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
          id: createUuid(),
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
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
      outPorts: [
        {
          id: createUuid(),
          name: "output",
          label: "output",
        },
      ],
    },
    schema: jsCodeSchema,
  },
]