
import { randomIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { IRandomConfig, Random } from "./reaction";
import { randomSchema } from "./schema";

export const randomMaterial: IReactionMaterial = {
  name: "random",
  icon: randomIcon,
  label: "$random",
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
  schema: randomSchema,
  reaction: Random,
  subTitle: (config?: IRandomConfig) => {
    if (config?.maxValue || config?.minValue) {
      return `${config.minValue || ""} ~ ${config.maxValue || ""}`
    }
  },
}