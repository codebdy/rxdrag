import { IReactionMaterial } from "runner/reaction/interfaces/material";
import { infoMessageMaterial } from "./infoMessage";
import { jsCodeMaterial } from "./jsCode";
import { routeToMaterial } from "./routeTo";
import { simulateDataMaterial } from "./simulateData";

export const commonReactions: IReactionMaterial[] = [
  routeToMaterial,
  infoMessageMaterial,
  simulateDataMaterial,
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