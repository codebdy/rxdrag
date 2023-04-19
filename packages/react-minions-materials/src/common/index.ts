import { infoMessageMaterial } from "./infoMessage";
import { jsCodeMaterial } from "./jsCode";
import { routeToMaterial } from "./routeTo";
import { mockDataMaterial } from "./mockData";
import { IReactionMaterial } from "@rxdrag/schema";
import { ReactNode } from "react";

export const commonReactions: IReactionMaterial<ReactNode>[] = [
  routeToMaterial,
  infoMessageMaterial,
  mockDataMaterial,
  // {
  //   name: "globalLoading",
  //   icon: loadingIcon,
  //   label: "$globalLoading",
  //   reactionType: ReactionType.SingleReaction,
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