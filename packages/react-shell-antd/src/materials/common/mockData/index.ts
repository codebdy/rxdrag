import { simulateIcon } from "react-shells/ant5/icons/reactions";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { IReactionMaterial, ReactionType } from "runner/minions";
import { MockData } from "./reaction";
import { mockDataSchema } from "./schema";

export const mockDataMaterial: IReactionMaterial = {
  name: "mockData",
  icon: simulateIcon,
  label: "$simulateData",
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
        name: "success",
        label: "$success",
      },
      {
        id: createUuid(),
        name: "error",
        label: "$error",
      },
      {
        id: createUuid(),
        name: "loading",
        label: "$loading",
      },
    ],
  },
  schema: mockDataSchema,
  reaction: MockData,
}