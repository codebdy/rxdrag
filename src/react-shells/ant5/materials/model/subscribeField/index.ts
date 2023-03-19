import { subscribeIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { SubscribeField } from "./reaction";
import { subscribeFieldSchema } from "./schema";

export const subscribeFieldMaterial: IReactionMaterial = {
  name: "subscribeField",
  icon: subscribeIcon,
  label: "$subscribeField",
  reactionType: ReactionType.SingleReaction,
  meta: {
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: subscribeFieldSchema,
  reaction: SubscribeField,
}