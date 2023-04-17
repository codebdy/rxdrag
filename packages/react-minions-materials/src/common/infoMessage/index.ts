
import { infoIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
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