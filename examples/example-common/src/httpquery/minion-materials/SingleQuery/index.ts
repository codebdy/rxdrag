import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { dataQueryIcon2 } from "../icons";
import { dataQuery2Schema } from "./schema";
import { MultipleQuery } from "../../activities";

//尚未完成
export const singleQueryMaterial: IQueryActivityMaterial = {
  activityName: MultipleQuery.NAME,
  icon: dataQueryIcon2,
  label: "$singleQuery",
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
  schema: dataQuery2Schema
}