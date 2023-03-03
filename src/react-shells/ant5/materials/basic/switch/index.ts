import { switchIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { switchSchema } from "./schema";

export const switchMaterial: IReactionMaterial = {
  name: "switch",
  icon: switchIcon,
  label: "$switch",
  reactionType: ReactionType.SingleReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$input",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output0",
        label: "output 0",
      },
      {
        id: createUuid(),
        name: "output1",
        label: "output 1",
      },
    ],
  },
  schema: switchSchema
} 