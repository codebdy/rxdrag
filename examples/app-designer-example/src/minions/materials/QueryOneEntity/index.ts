import { createId } from "@rxdrag/shared";
import { NodeType } from "@rxdrag/minions-schema";
import { oneEntityIcon } from "@rxdrag/react-shared";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { QueryOneEntity } from "../../activities";
import { IEntityQueryConfig } from "../../activities/common/IEntityQueryConfig";
import { IEntitiesContext } from "../../contexts";
import { querySchema } from "../QueryEntities/schema";

export const queryOneEntityMaterial: IRxDragActivityMaterial<IEntityQueryConfig, IEntitiesContext> = {
  icon: oneEntityIcon,
  label: "$queryOneEntity",
  color: "#e10098",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "$query",
      },
      {
        id: createId(),
        name: QueryOneEntity.INPUT_NAME_CONDITION_PARAMS,
        label: "$conditionParams",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: QueryOneEntity.OUTPUT_ENTITY,
        label: "$entity",
      },
      {
        id: createId(),
        name: QueryOneEntity.OUTPUT_SUCCESS,
        label: "$success",
      },
      {
        id: createId(),
        name: QueryOneEntity.OUTPUT_FAILURE,
        label: "$failure",
      },
      {
        id: createId(),
        name: QueryOneEntity.OUTPUT_LOADING,
        label: "$loading",
      },
    ],
  },
  schema: querySchema,
  activityName: QueryOneEntity.NAME,
  subTitle: (config?: IEntityQueryConfig, context?: IEntitiesContext) => {
    const entity = context?.entities?.find(ent => ent.uuid === config?.entityId)

    return entity?.label || entity?.name || entity?.uuid
  },
}