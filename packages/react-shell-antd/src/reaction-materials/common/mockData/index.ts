import { simulateIcon } from "@rxdrag/react-shared";
import { IReactionMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
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