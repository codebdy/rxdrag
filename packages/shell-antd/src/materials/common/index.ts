import { IReactionMaterial } from "runner/minions/interfaces/material";
import { infoMessageMaterial } from "./infoMessage";
import { jsCodeMaterial } from "./jsCode";
import { routeToMaterial } from "./routeTo";
import { mockDataMaterial } from "./mockData";

export const commonReactions: IReactionMaterial[] = [
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