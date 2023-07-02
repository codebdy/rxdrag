import { createUuid } from "@rxdrag/shared";
import { mockSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { simulateIcon } from "../../icons";
import { Mock } from "@rxdrag/minions-activities";
import { IRxDragActivityMaterial } from "../../interfaces";

export const mockMaterial: IRxDragActivityMaterial = {
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
  activityName: Mock.NAME,
}