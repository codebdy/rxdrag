import { createId } from "@rxdrag/shared";
import { querySchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { listIcon } from "@rxdrag/react-shared";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { QueryEntities } from "../../activities";
import { IEntitiesContext } from "../../contexts";
import { IEntityQueryConfig } from "../../activities/common/IEntityQueryConfig";

export const queryEntitiesMaterial: IRxDragActivityMaterial<IEntityQueryConfig, IEntitiesContext> = {
  icon: listIcon,
  label: "$queryEntities",
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
        name: QueryEntities.INPUT_NAME_CONDITION_PARAMS,
        label: "$conditionParams",
      },
      {
        id: createId(),
        name: QueryEntities.INPUT_NAME_PAGE,
        label: "$pageNumber",
      },
      {
        id: createId(),
        name: QueryEntities.INPUT_PAGE_SIZE,
        label: "$pageSize",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: QueryEntities.OUTPUT_LIST,
        label: "$dataList",
      },
      {
        id: createId(),
        name: QueryEntities.OUTPUT_TOTAL,
        label: "$total",
      },
      {
        id: createId(),
        name: QueryEntities.OUTPUT_SUCCESS,
        label: "$success",
      },
      {
        id: createId(),
        name: QueryEntities.OUTPUT_FAILURE,
        label: "$failure",
      },
      {
        id: createId(),
        name: QueryEntities.OUTPUT_LOADING,
        label: "$loading",
      },
    ],
  },
  schema: querySchema,
  activityName: QueryEntities.NAME,
  subTitle: (config?: IEntityQueryConfig, context?: IEntitiesContext) => {
    const entity = context?.entities?.find(ent => ent.uuid === config?.entityId)

    return entity?.label || entity?.name || entity?.uuid
  },
}