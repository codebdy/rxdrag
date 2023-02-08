import { INodeSchema } from "core";
import { ReactionType } from "runner/reaction/interfaces/metas";
import { IReactionMaterial } from "../../../../runner/reaction/interfaces/material";
import { endIcon, startIcon } from "../../icons/reactions";
import { labelSchema, nameSchema } from "../baseSchema";
import { conditionMaterial } from "./condition";
import { delayMaterial } from "./delay";
import { fixedValueMaterial } from "./fixedValue";
import { intervalMaterial } from "./interval";
import { loopMaterial } from "./loop";
import { mergeMaterial } from "./merge";
import { randomMaterial } from "./random";
import { switchMaterial } from "./switch";

export const startEndSchema: INodeSchema = {
  componentName: "Fragment",
  children: [nameSchema, labelSchema],
}

export const basicReactions: IReactionMaterial[] = [
  {
    name: "start",
    icon: startIcon,
    label: "$input",
    reactionType: ReactionType.Start,
    meta: {
      name: "input"
    },
    schema: startEndSchema,
  },
  {
    name: "end",
    icon: endIcon,
    label: "$output",
    reactionType: ReactionType.End,
    meta: {
      name: "output"
    },
    schema: startEndSchema,
  },
  conditionMaterial,
  loopMaterial,
  mergeMaterial,
  switchMaterial,
  delayMaterial,
  randomMaterial,
  intervalMaterial,
  fixedValueMaterial,
]