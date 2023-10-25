import { createId } from "@rxdrag/shared";
import { schema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { removeIcon } from "@rxdrag/react-shared";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { RemoveEntity } from "../../activities";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IEntityConfig } from "../../activities/common/IEntityConfig";
import { IEntitiesContext } from "../../contexts";

export const removeEntityMaterial: IRxDragActivityMaterial<IEntityConfig, IEntitiesContext> = {
  icon: removeIcon,
  label: "$removeEntity",
  color: "#e10098",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: RemoveEntity.OUTPUT_SUCCESS,
        label: "$success",
      },
      {
        id: createId(),
        name: RemoveEntity.OUTPUT_FAILURE,
        label: "$failure",
      },
      {
        id: createId(),
        name: RemoveEntity.OUTPUT_LOADING,
        label: "$loading",
      },
    ],
  },
  schema: schema,
  activityName: RemoveEntity.NAME,
  subTitle: (config?: IEntityConfig, context?: IEntitiesContext) => {
    const entity = context?.entities?.find(ent => ent.uuid === config?.entityId)

    return entity?.label || entity?.name || entity?.uuid
  },
}