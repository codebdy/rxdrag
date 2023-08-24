import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { dataQueryIcon } from "../icons";
import { dataQuerySchema } from "./schema";
import { MultipleQuery } from "httpquery/activities";

export const multipleQueryMaterial: IQueryActivityMaterial = {
  activityName: MultipleQuery.NAME,
  icon: dataQueryIcon,
  label: "$multipleQuery",
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
        name: MultipleQuery.OUTPUT_NAME_DATA,
        label: "$dataOut",
      },
      {
        id: createUuid(),
        name: MultipleQuery.OUTPUT_NAME_QUERYING,
        label: "$querying",
      },
      {
        id: createUuid(),
        name: MultipleQuery.OUTPUT_NAME_ERROR,
        label: "$error",
      },
    ],
  },
  schema: dataQuerySchema
}