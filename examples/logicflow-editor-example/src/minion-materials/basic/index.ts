import { labelSchema, nameSchema } from "../baseSchema";
import { conditionMaterial } from "./condition";
import { delayMaterial } from "./delay";
import { constValueMaterial } from "./constValue";
import { loopMaterial } from "./loop";
import { mergeMaterial } from "./merge";
import { IActivityMaterial, NodeType } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { splitArrayMaterial } from "./SplitArray";
import { splitObjectMaterial } from "./SplitObject";
import { jsCodeMaterial } from "./jsCode";
import { startIcon, endIcon } from "@rxdrag/react-shared";

export const startEndSchema: INodeSchema = {
  componentName: "Fragment",
  children: [nameSchema, labelSchema],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const basicActivities: IActivityMaterial<any, any, any, any>[] = [
  {
    activityName: "start",
    icon: startIcon,
    label: "$input",
    activityType: NodeType.Start,
    schema: startEndSchema,
  },
  {
    activityName: "end",
    icon: endIcon,
    label: "$output",
    activityType: NodeType.End,
    schema: startEndSchema,
  },
  conditionMaterial,
  loopMaterial,
  mergeMaterial,
  delayMaterial,
  constValueMaterial,
  splitArrayMaterial,
  splitObjectMaterial,
  jsCodeMaterial
]