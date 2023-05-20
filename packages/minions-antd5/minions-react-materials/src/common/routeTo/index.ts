import { routeIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { routeToSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { RouteToActivityName } from "@rxdrag/minions-runtime-react";

export const routeToMaterial: IActivityMaterial<ReactNode> = {
  icon: routeIcon,
  label: "$routeTo",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: routeToSchema,
  activityName: RouteToActivityName,
}