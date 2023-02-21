import { intervalIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
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