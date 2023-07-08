import { labelSchema, nameSchema } from "../baseSchema";
import { conditionMaterial } from "./condition";
import { delayMaterial } from "./delay";
import { constValueMaterial } from "./constValue";
import { loopMaterial } from "./loop";
import { mergeMaterial } from "./merge";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { endIcon, startIcon } from "../icons";
import { splitArrayMaterial } from "./SplitArray";
import { splitObjectMaterial } from "./SplitObject";
import { jsCodeMaterial } from "./jsCode";

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
    activityType: ActivityType.Start,
    schema: startEndSchema,
  },
  {
    activityName: "end",
    icon: endIcon,
    label: "$output",
    activityType: ActivityType.End,
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