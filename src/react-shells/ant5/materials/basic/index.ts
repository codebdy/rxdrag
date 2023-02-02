import { ReactionType } from "runner/reaction/interfaces/metas";
import { IReactionMaterial } from "../../../../runner/reaction/interfaces/material";
import { delayIcon, endIcon, ifIcon, loopIcon, mergeIcon, randomIcon, startIcon, switchIcon } from "../../icons/reactions";
import { startEndSchema } from "./schemas/base";
import { conditionSchema } from "./schemas/condition";
import { loopSchema } from "./schemas/loop";
import { mergeSchema } from "./schemas/merge";

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
  {
    name: "condition",
    icon: ifIcon,
    label: "$conditionCheck",
    reactionType: ReactionType.SingleReaction,
    color: "#5e76c3",
    meta: {
      inPorts: [
        {
          name: "input",
          label: "",//"$inputCondition",
        },
      ],
      outPorts: [
        {
          name: "true",
          label: "$true",
        },
        {
          name: "false",
          label: "$false",
        },
      ],
    },
    schema: conditionSchema
  },
  {
    name: "loop",
    icon: loopIcon,
    label: "$loop",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          name: "input",
          label: "",//"$input",
        },
      ],
      outPorts: [
        {
          name: "output",
          label: "",//"$output",
        },
      ],
    },
    schema: loopSchema,
  },
  {
    name: "merge",
    icon: mergeIcon,
    label: "$merge",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          name: "input1",
          label: "input 1",
        },
        {
          name: "input2",
          label: "input 2",
        },
      ],
      outPorts: [
        {
          name: "output",
          label: "",//"$output",
        },
      ],
    },
    schema: mergeSchema,
  },

  {
    name: "switch",
    icon: switchIcon,
    label: "$switch",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          name: "input",
          label: "",//"$input",
        },
      ],
      outPorts: [
        {
          name: "output1",
          label: "output1",
        },
        {
          name: "output2",
          label: "output2",
        },
      ],
    }
  },
  {
    name: "delay",
    icon: delayIcon,
    label: "$delay",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          name: "startUp",
          label: "",//"$startUp",
        },
      ],
      outPorts: [
        {
          name: "output",
          label: "",//"$output",
        },
      ],
    }
  },
  {
    name: "random",
    icon: randomIcon,
    label: "$random",
    reactionType: ReactionType.SingleReaction,
    meta: {
      inPorts: [
        {
          name: "startUp",
          label: "",//"$startUp",
        },
      ],
      outPorts: [
        {
          name: "output",
          label: "",//"$output",
        },
      ],
    }
  },
]