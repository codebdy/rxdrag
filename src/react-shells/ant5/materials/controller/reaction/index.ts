import { methodIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/reaction";

export const reactionMaterial: IReactionMaterial = {
  name: "controllerReaction",
  icon: methodIcon,
  label: "reaction",
  reactionType: ReactionType.ControllerReaction,
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
}
