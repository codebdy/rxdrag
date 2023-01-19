import { GlobalToken } from "antd/es/theme/interface";
import { IReactionMaterial } from "../../../runner/reaction/interfaces/marerial";
import { startIcon } from "../icons/reactions";

export const basicReactions: IReactionMaterial[] = [
  {
    name: "start",
    icon: startIcon,
    title: "$start",
  }
]