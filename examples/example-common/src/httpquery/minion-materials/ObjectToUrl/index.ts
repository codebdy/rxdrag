import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { objectToUrlSchema } from "./schema";
import { ObjectToUrl } from "../../activities/ObjectToUrl";
import { objectToUrlIcon } from "@rxdrag/react-shared";

export const objectToUrlMaterial: IQueryActivityMaterial = {
  activityName: ObjectToUrl.NAME,
  icon: objectToUrlIcon,
  label: "$ObjectToUrl",
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
  schema: objectToUrlSchema
}