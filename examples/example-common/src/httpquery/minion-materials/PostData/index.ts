import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { postDataSchema } from "./schema";
import { PostData } from "../../activities";
import { postDataIcon } from "@rxdrag/react-shared";

export const postDataMaterial: IQueryActivityMaterial = {
  activityName: PostData.NAME,
  icon: postDataIcon,
  label: "$postData",
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
        name: PostData.OUTPUT_NAME_DATA,
        label: "$dataOut",
      },
      {
        id: createId(),
        name: PostData.OUTPUT_NAME_POSTING,
        label: "$posting",
      },
      {
        id: createId(),
        name: PostData.OUTPUT_NAME_ERROR,
        label: "$error",
      },
    ],
  },
  schema: postDataSchema
}