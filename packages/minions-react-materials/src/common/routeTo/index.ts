import { createId } from "@rxdrag/shared";
import { routeToSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { routeIcon } from "@rxdrag/react-shared";
import { RouteTo } from "@rxdrag/minions-activities";

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