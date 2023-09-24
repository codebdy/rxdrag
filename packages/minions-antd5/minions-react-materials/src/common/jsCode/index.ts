import { createId } from "@rxdrag/shared";
import { jsCodeSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { jsIcon } from "../../icons";
import { JsCode } from "@rxdrag/minions-activities";
import { IRxDragActivityMaterial } from "../../interfaces";

export const jsCodeMaterial: IRxDragActivityMaterial = {
  icon: jsIcon,
  label: "$jsCode",
  activityType: NodeType.Activity,
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
        name: "output",
        label: "output",
      },
    ],
  },
  schema: jsCodeSchema,
  activityName: JsCode.NAME,
}