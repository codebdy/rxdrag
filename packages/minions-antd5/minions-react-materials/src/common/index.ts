import { infoMessageMaterial } from "./infoMessage";
import { jsCodeMaterial } from "./jsCode";
import { routeToMaterial } from "./routeTo";
import { mockMaterial } from "./mock";
import { IActivityMaterial } from "@rxdrag/schema";
import { ReactNode } from "react";

export const commonReactions: IActivityMaterial<ReactNode>[] = [
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