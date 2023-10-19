import { createId } from "@rxdrag/shared";
import { contextReadSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { contextReadIcon } from "../../icons";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "../../consts";
import { IContextVariableConfig } from "../contextWrite";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";

export const contextReadMaterial:  IRxDragActivityMaterial<IContextVariableConfig>= {
  activityName: "contextRead",
  icon:contextReadIcon,
  label: "$contextRead",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
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