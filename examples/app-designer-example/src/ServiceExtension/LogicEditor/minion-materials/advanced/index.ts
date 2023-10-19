import { IActivityMaterial } from "@rxdrag/minions-schema";
import { subLogicFlowMaterial } from "./subLogicFlow";
import { customizedLoopMaterial } from "./customizedLoop";
import { transactionMaterial } from "./transaction";
import { httpRequestMaterial } from "./httpRequest";
import { graphqlRequestMaterial } from "./graphqlRequest";
import { entifyRequestMaterial } from "./entifyRequest";

export const advancedActivities: IActivityMaterial<any, any, any, any>[] = [
  customizedLoopMaterial,
  transactionMaterial,
  entifyRequestMaterial,
  httpRequestMaterial,
  graphqlRequestMaterial,
  subLogicFlowMaterial,
]