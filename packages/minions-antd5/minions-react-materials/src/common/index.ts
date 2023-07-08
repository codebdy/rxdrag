import { infoMessageMaterial } from "./infoMessage";
import { jsCodeMaterial } from "./jsCode";
import { routeToMaterial } from "./routeTo";
import { mockMaterial } from "./mock";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { advancedLoopMaterial } from "./AdvancedLoop";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commonActivites: IActivityMaterial<any, any, any, any>[] = [
  advancedLoopMaterial,
  routeToMaterial,
  infoMessageMaterial,
  mockMaterial,
  // {
  //   name: "globalLoading",
  //   icon: loadingIcon,
  //   label: "$globalLoading",
  //   activityType: ActivityType.SingleReaction,
  //   meta: {
  //     inPorts: [
  //       {
  //         id: createUuid(),
  //         name: "input",
  //         label: "",
  //       },
  //     ],
  //   }
  // },
  jsCodeMaterial,
]