import { delayIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Delay, IDelayConfig } from "./reaction";
import { delaySchema } from "./schema";

export const delayMaterial: IReactionMaterial = {
  name: "delay",
  icon: delayIcon,
  label: "$delay",
  reactionType: ReactionType.SingleReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "startUp",
        label: "",//"$startUp",
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
  schema: delaySchema,
  reaction: Delay,
  subTitle: (config?: IDelayConfig) => {
    if (config?.time) {
      return config?.time?.toString()
    }
  },
}