import { Reaction } from "@rxdrag/minions-runtime-react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { methodIcon } from "../../icons";

export const reactionMaterial: IActivityMaterial<ReactNode> = {
  activityName: Reaction.NAME,
  icon: methodIcon,
  label: "reaction",
  activityType: ActivityType.LogicFlowActivity,
  defaultPorts: {
  },
}
