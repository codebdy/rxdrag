import { ActivityType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { dataQueryIcon2 } from "../icons";
import { dataQuery2Schema } from "./schema";
import { RestfulQuery } from "httpquery/activities";

export const dataQuery2Material: IQueryActivityMaterial = {
  activityName: RestfulQuery.NAME,
  icon: dataQueryIcon2,
  label: "$restfulQuery2",
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
        name: RestfulQuery.OUTPUT_NAME_DATA,
        label: "$dataOut",
      },
      {
        id: createUuid(),
        name: RestfulQuery.OUTPUT_NAME_QUERYING,
        label: "$querying",
      },
      {
        id: createUuid(),
        name: RestfulQuery.OUTPUT_NAME_ERROR,
        label: "$error",
      },
    ],
  },
  schema: dataQuery2Schema
}