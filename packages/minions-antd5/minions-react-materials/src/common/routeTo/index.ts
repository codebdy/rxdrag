import { createUuid } from "@rxdrag/shared";
import { routeToSchema } from "./schema";
import { ActivityType } from "@rxdrag/minions-schema";
import { routeIcon } from "../../icons";
import { RouteTo } from "@rxdrag/minions-runtime-react";
import { IRxDragActivityMaterial } from "../../interfaces";

export const routeToMaterial: IRxDragActivityMaterial = {
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
  activityName: RouteTo.NAME,
}