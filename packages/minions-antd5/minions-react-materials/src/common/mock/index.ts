import { simulateIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { mockSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { MockActivityName } from "@rxdrag/minions-activities";

export const mockMaterial: IActivityMaterial<ReactNode> = {
  icon: simulateIcon,
  label: "$simulateData",
  activityType: ActivityType.Activity,
  defaultPorts: {
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
  schema: mockSchema,
  activityName: MockActivityName,
}