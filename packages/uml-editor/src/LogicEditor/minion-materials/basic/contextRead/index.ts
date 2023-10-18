import { createUuid } from "@rxdrag/shared";
import { contextReadSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { contextReadIcon } from "../../icons";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "../../consts";
import { IRxDragActivityMaterial } from "../../interfaces";
import { IContextVariableConfig } from "../contextWrite";

export const contextReadMaterial:  IRxDragActivityMaterial<IContextVariableConfig>= {
  activityName: "contextRead",
  icon:contextReadIcon,
  label: "$contextRead",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: contextReadSchema,
  subTitle: (config?: IContextVariableConfig) => {
    return config?.name
  },
}