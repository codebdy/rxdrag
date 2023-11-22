import { createId } from "@rxdrag/shared";
import { schema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { saveEntityIcon } from "@rxdrag/react-shared";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { SaveEntity } from "../../activities";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IEntityConfig } from "../../activities/common/IEntityConfig";
import { IEntitiesContext } from "../../contexts";

export const saveEntityMaterial: IRxDragActivityMaterial<IEntityConfig, IEntitiesContext> = {
  icon: saveEntityIcon,
  label: "$saveEntity",
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
        name: SaveEntity.OUTPUT_ENTITY,
        label: "$entity",
      },
      {
        id: createId(),
        name: SaveEntity.OUTPUT_SUCCESS,
        label: "$success",
      },
      {
        id: createId(),
        name: SaveEntity.OUTPUT_FAILURE,
        label: "$failure",
      },
      {
        id: createId(),
        name: SaveEntity.OUTPUT_LOADING,
        label: "$loading",
      },
    ],
  },
  schema: schema,
  activityName: SaveEntity.NAME,
  subTitle: (config?: IEntityConfig, context?: IEntitiesContext) => {
    const entity = context?.entities?.find(ent => ent.uuid === config?.entityId)

    return entity?.label || entity?.name || entity?.uuid
  },
}