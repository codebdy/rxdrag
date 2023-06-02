import { ActivityType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { DataQuery } from "httpquery/minions";
import { dataQueryIcon } from "../icons";
import { dataQuerySchema } from "./schema";

export const dataQueryMaterial: IQueryActivityMaterial = {
  activityName: DataQuery.NAME,
  icon: dataQueryIcon,
  label: "$dataQuery",
  activityType: ActivityType.Activity,
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
        name: DataQuery.OUTPUT_NAME_DATA,
        label: "$dataOut",
      },
      {
        id: createUuid(),
        name: DataQuery.OUTPUT_NAME_QUERYING,
        label: "$querying",
      },
      {
        id: createUuid(),
        name: DataQuery.OUTPUT_NAME_ERROR,
        label: "$error",
      },
    ],
  },
  schema: dataQuerySchema
}