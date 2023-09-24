import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { transactionIcon } from "../../icons";
import { transactionSchema } from "./schema";
import { createUuid } from "@rxdrag/shared";

export const transactionMaterial: IRxDragActivityMaterial = {
  icon: transactionIcon,
  label: "$transaction",
  activityType: NodeType.EmbeddedFlow,
  defaultPorts: {
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
        name: "finished",
        label: "$finished",
      },
      {
        id: createUuid(),
        name: "rollback",
        label: "$rollback",
      },
    ],
  },
  schema: transactionSchema,
  activityName: "transaction"
}
