import { createId } from "@rxdrag/shared";
import { routeToSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { RouteTo } from "@rxdrag/minions-runtime-react";
import { IRxDragActivityMaterial } from "../../interfaces";
import { routeIcon } from "@rxdrag/react-shared";

export const routeToMaterial: IRxDragActivityMaterial = {
  icon: routeIcon,
  label: "$routeTo",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: routeToSchema,
  activityName: RouteTo.NAME,
}