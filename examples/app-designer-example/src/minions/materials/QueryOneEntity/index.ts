import { createId } from "@rxdrag/shared";
import { schema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { oneEntityIcon } from "@rxdrag/react-shared";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { QueryOneEntity } from "../../activities";

export const queryOneEntityMaterial: IRxDragActivityMaterial = {
  icon: oneEntityIcon,
  label: "$queryOneEntity",
  color: "#e10098",
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
        name: "success",
        label: "$success",
      },
      {
        id: createId(),
        name: "error",
        label: "$error",
      },
      {
        id: createId(),
        name: "loading",
        label: "$loading",
      },
    ],
  },
  schema: schema,
  activityName: QueryOneEntity.NAME,
}