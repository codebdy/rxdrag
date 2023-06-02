import { ActivityType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { PaginationQuery } from "httpquery/minions";
import { paginationQueryIcon } from "../icons";

export const readFormValueMaterial: IQueryActivityMaterial = {
  activityName: PaginationQuery.NAME,
  icon: paginationQueryIcon,
  label: "$paginationQuery",
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
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  }
}