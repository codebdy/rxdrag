import { jsIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { JsCode } from "./reaction";
import { jsCodeSchema } from "./schema";

export const jsCodeMaterial: IReactionMaterial = {
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
  reaction: JsCode,
}