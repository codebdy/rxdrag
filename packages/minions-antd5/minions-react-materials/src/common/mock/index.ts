import { createId } from "@rxdrag/shared";
import { mockSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { Mock } from "@rxdrag/minions-activities";
import { IRxDragActivityMaterial } from "../../interfaces";
import { simulateIcon } from "@rxdrag/react-shared";

export const mockMaterial: IRxDragActivityMaterial = {
  icon: simulateIcon,
  label: "$simulateData",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "success",
        label: "$success",
      },
      {
        id: createId(),
        name: "error",
        label: "$error",
      },
      {
        id: createId(),
        name: "loading",
        label: "$loading",
      },
    ],
  },
  schema: mockSchema,
  activityName: Mock.NAME,
}