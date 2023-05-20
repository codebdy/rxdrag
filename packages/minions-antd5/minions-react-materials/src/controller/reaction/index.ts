import { ReactionActivityName } from "@rxdrag/minions-runtime-react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { methodIcon } from "@rxdrag/react-shared";
import { ReactNode } from "react";

export const reactionMaterial: IActivityMaterial<ReactNode> = {
  activityName: ReactionActivityName,
  icon: methodIcon,
  label: "reaction",
  activityType: ActivityType.Activity,
  defaultPorts: {
  },
}
