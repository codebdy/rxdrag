import { simulateIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { MockData } from "./reaction";
import { mockDataSchema } from "./schema";
import { ReactNode } from "react";

export const mockDataMaterial: IActivityMaterial<ReactNode> = {
  name: "mockData",
  icon: simulateIcon,
  label: "$simulateData",
  reactionType: ActivityType.SingleActivity,
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