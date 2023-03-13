import { infoIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { IInfoMessageConfig, InfoMessage } from "./reaction";
import { infoMessageSchema } from "./schema";

export const infoMessageMaterial: IReactionMaterial = {
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
  schema: infoMessageSchema,
  reaction: InfoMessage,
  subTitle: (config?: IInfoMessageConfig) => {
    if (config?.type) {
      return config?.type?.toString()
    }
  },
}