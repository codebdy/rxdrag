import { labelSchema, nameSchema } from "../baseSchema";
import { conditionMaterial } from "./condition";
import { delayMaterial } from "./delay";
import { constValueMaterial } from "./constValue";
import { signalsMaterial } from "./signals";
import { loopMaterial } from "./loop";
import { mergeMaterial } from "./merge";
import { randomMaterial } from "./random";
import { IActivityMaterial, NodeType } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { splitArrayMaterial } from "./SplitArray";
import { splitObjectMaterial } from "./SplitObject";
import { sumArrayMaterial } from "./sumArray";
import { collectToArrayMaterial } from "./collectToArray";
import { equalMaterial } from "./equal";
import { increaseMaterial } from "./increase";
import { negationMaterial } from "./negation";
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
  negationMaterial,
  increaseMaterial,
  equalMaterial,
  conditionMaterial,
  loopMaterial,
  mergeMaterial,
  delayMaterial,
  randomMaterial,
  signalsMaterial,
  constValueMaterial,
  splitArrayMaterial,
  splitObjectMaterial,
  collectToArrayMaterial,
  sumArrayMaterial,
]