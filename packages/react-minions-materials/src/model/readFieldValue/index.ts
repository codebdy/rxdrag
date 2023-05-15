import { fieldReadIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ReactionType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { ReadFieldValue } from "./reaction";
import { readFieldValueSchema } from "./schema";
import { ReactNode } from "react";

export const readFieldValueMaterial: IActivityMaterial<ReactNode> = {
  name: "readFieldValue",
  icon: fieldReadIcon,
  label: "$readFieldValue",
  reactionType: ReactionType.SingleReaction,
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
        label: "",
      },
    ],
  },
  schema: readFieldValueSchema,
  reaction: ReadFieldValue,
}