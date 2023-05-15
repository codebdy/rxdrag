import { fixedValueIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { FixedValue } from "./reaction";
import { fixedValueSchema } from "./schema";
import { ReactNode } from "react";

export const fixedValueMaterial: IActivityMaterial<ReactNode> = {
  name: "fixedValue",
  icon: fixedValueIcon,
  label: "$fixedValue",
  reactionType: ActivityType.SingleActivity,
  color: "#1668dc",
  meta: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$output",
      },
    ],
  },
  schema: fixedValueSchema,
  reaction: FixedValue,
}