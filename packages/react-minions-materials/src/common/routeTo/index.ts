import { routeIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { RouteTo } from "./reaction";
import { routeToSchema } from "./schema";
import { ReactNode } from "react";

export const routeToMaterial: IActivityMaterial<ReactNode> = {
  name: "routeTo",
  icon: routeIcon,
  label: "$routeTo",
  reactionType: ReactionType.SingleReaction,
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: routeToSchema,
  reaction: RouteTo,
}