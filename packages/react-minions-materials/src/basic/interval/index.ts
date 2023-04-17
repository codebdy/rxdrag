import { intervalIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { IIntervalConfig, Interval } from "./reaction";
import { intervalSchema } from "./schema";

export const intervalMaterial: IReactionMaterial = {
  name: "interval",
  icon: intervalIcon,
  label: "$interval",
  reactionType: ReactionType.SingleReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "startUp",
        label: "$startUp",
      },
      {
        id: createUuid(),
        name: "stop",
        label: "$stop",
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
  schema: intervalSchema,
  subTitle: (config?: IIntervalConfig) => {
    if (config?.interval) {
      return config?.interval?.toString()
    }
  },
  reaction: Interval,
}