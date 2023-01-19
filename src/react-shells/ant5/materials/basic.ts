import { ReactionType } from "runner/reaction/interfaces/metas";
import { IReactionMaterial } from "../../../runner/reaction/interfaces/marerial";
import { delayIcon, endIcon, ifIcon, loopIcon, mergeIcon, randomIcon, startIcon, switchIcon } from "../icons/reactions";

export const basicReactions: IReactionMaterial[] = [
  {
    name: "start",
    icon: startIcon,
    label: "$input",
    reactionType: ReactionType.Start,
    color: "#5e76c3",
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
    label: "$condition",
    reactionType: ReactionType.SingleReaction,
    color: "#5e76c3",
  },
  {
    name: "loop",
    icon: loopIcon,
    label: "$loop",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "merge",
    icon: mergeIcon,
    label: "$merge",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "switch",
    icon: switchIcon,
    label: "$switch",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "delay",
    icon: delayIcon,
    label: "$delay",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "random",
    icon: randomIcon,
    label: "$random",
    reactionType: ReactionType.SingleReaction,
  },
]