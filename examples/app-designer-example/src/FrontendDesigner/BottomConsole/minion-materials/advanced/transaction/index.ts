import { NodeType } from "@rxdrag/minions-schema";
import { IRxDragActivityMaterial } from "../../interfaces";
import { transactionIcon } from "../../icons";
import { transactionSchema } from "./schema";
import { createId } from "@rxdrag/shared";

export const transactionMaterial: IRxDragActivityMaterial = {
  icon: transactionIcon,
  label: "$transaction",
  activityType: NodeType.EmbeddedFlow,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "finished",
        label: "$finished",
      },
      {
        id: createId(),
        name: "rollback",
        label: "$rollback",
      },
    ],
  },
  schema: transactionSchema,
  activityName: "transaction"
}
