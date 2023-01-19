import { ReactionType } from "runner/reaction/interfaces/metas";
import { IReactionMaterial } from "../../../runner/reaction/interfaces/marerial";
import { delayIcon, endIcon, ifIcon, loopIcon, mergeIcon, randomIcon, startIcon, switchIcon } from "../icons/reactions";

export const basicReactions: IReactionMaterial[] = [
  {
    name: "start",
    icon: startIcon,
    title: "$start",
    reactionType: ReactionType.Start,
    color: "#5e76c3",
  },
  {
    name: "end",
    icon: endIcon,
    title: "$end",
    reactionType: ReactionType.End,
  },
  {
    name: "condition",
    icon: ifIcon,
    title: "$condition",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "loop",
    icon: loopIcon,
    title: "$loop",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "merge",
    icon: mergeIcon,
    title: "$merge",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "switch",
    icon: switchIcon,
    title: "$switch",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "delay",
    icon: delayIcon,
    title: "$delay",
    reactionType: ReactionType.SingleReaction,
  },
  {
    name: "random",
    icon: randomIcon,
    title: "$random",
    reactionType: ReactionType.SingleReaction,
  },
]