import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { dataQuerySchema } from "./schema";
import { MultipleQuery } from "../../activities";
import { dataQueryIcon } from "@rxdrag/react-shared";

export const multipleQueryMaterial: IQueryActivityMaterial = {
  activityName: MultipleQuery.NAME,
  icon: dataQueryIcon,
  label: "$multipleQuery",
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
        name: MultipleQuery.OUTPUT_NAME_DATA,
        label: "$dataOut",
      },
      {
        id: createId(),
        name: MultipleQuery.OUTPUT_NAME_QUERYING,
        label: "$querying",
      },
      {
        id: createId(),
        name: MultipleQuery.OUTPUT_NAME_ERROR,
        label: "$error",
      },
    ],
  },
  schema: dataQuerySchema
}