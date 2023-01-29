import { ReactionType } from "runner/reaction/interfaces/metas";
import { IReactionMaterial } from "../../../runner/reaction/interfaces/material";
import { delayIcon, endIcon, ifIcon, listenVariableIcon, loopIcon, mergeIcon, randomIcon, setVariableIcon, startIcon, switchIcon } from "../icons/reactions";

export const basicReactions: IReactionMaterial[] = [
  {
    name: "start",
    icon: startIcon,
    label: "$input",
    reactionType: ReactionType.Start,
    //color: "#5e76c3",
  },
  {
    name: "end",
    icon: endIcon,
    label: "$output",
    reactionType: ReactionType.End,
  },
  {
    name: "condition",
    icon: ifIcon,
    label: "$conditionCheck",
    reactionType: ReactionType.SingleReaction,
    color: "#5e76c3",
    meta: {
      ports: [
        {
          name: "input",
          label: "",//"$inputCondition",
          group: "in",
        },
        {
          name: "true",
          label: "$true",
          group: "out",
        },
        {
          name: "false",
          label: "$false",
          group: "out",
        },
      ],
    }
  },
  {
    name: "loop",
    icon: loopIcon,
    label: "$loop",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "input",
          label: "",//"$input",
          group: "in",
        },
        {
          name: "output",
          label: "",//"$output",
          group: "out",
        },
      ],
    }
  },
  {
    name: "merge",
    icon: mergeIcon,
    label: "$merge",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "input1",
          label: "input 1",
          group: "in",
        },
        {
          name: "input2",
          label: "input 2",
          group: "in",
        },
        {
          name: "output",
          label: "",//"$output",
          group: "out",
        },
      ],
    }
  },
  {
    name: "switch",
    icon: switchIcon,
    label: "$switch",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "input",
          label: "",//"$input",
          group: "in",
        },
        {
          name: "output1",
          label: "output1",
          group: "out",
        },
        {
          name: "output2",
          label: "output2",
          group: "out",
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
      ports: [
        {
          name: "startUp",
          label: "",//"$startUp",
          group: "in",
        },
        {
          name: "output",
          label: "",//"$output",
          group: "out",
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
      ports: [
        {
          name: "startUp",
          label: "",//"$startUp",
          group: "in",
        },
        {
          name: "output",
          label: "",//"$output",
          group: "out",
        },
      ],
    }
  },
  {
    name: "setVariable",
    icon: setVariableIcon,
    label: "$setVariable",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "input",
          label: "",//"$startUp",
          group: "in",
        },
      ],
    }
  },
  {
    name: "listenVariable",
    icon: listenVariableIcon,
    label: "$listenVariable",
    reactionType: ReactionType.SingleReaction,
    meta: {
      ports: [
        {
          name: "output",
          label: "",//"$startUp",
          group: "out",
        },
      ],
    }
  },
]