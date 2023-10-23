import { createId } from "@rxdrag/shared";
import { schema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { listIcon } from "@rxdrag/react-shared";
import { IRxDragActivityMaterial } from "@rxdrag/minions-react-materials";
import { IQueryEntitiesConfig, QueryEntities } from "../../activities";
import { IEntitiesContext } from "../../contexts";

export const queryEntitiesMaterial: IRxDragActivityMaterial<IQueryEntitiesConfig, IEntitiesContext> = {
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
        name: QueryEntities.INPUT_NAME_CONDITION,
        label: "$condition",
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
        name: "data",
        label: "$data",
      },
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
  activityName: QueryEntities.NAME,
  subTitle: (config?: IQueryEntitiesConfig, context?: IEntitiesContext) => {
    const entity = context?.entities?.find(ent => ent.uuid === config?.entityId)

    return entity?.label || entity?.name || entity?.uuid
  },
}