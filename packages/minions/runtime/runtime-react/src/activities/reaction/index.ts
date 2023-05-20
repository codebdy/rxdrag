import { IActivity, IActivityJointers, LogicFlow, activity } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { IControllerConfig } from "../AbstractControllerActivity";

export const ReactionActivityName = "system-react.reaction"

export interface IReactionConfig extends IControllerConfig {
  reactionId?: string
}

@activity(ReactionActivityName)
export class ReactionActivity implements IActivity {
  id: string;
  jointers: IActivityJointers;
  config?: IReactionConfig;

  constructor(meta: IActivityDefine<IReactionConfig>, context: IControllerContext) {
    this.id = meta.id
    const defineMeta = context?.controllers?.[meta?.config?.controllerId || ""]?.meta.reactions?.find(reactionMeta => reactionMeta.id === meta.config?.reactionId)
    if (defineMeta) {
      const logicFlow = new LogicFlow(defineMeta, context)
      this.jointers = logicFlow.jointers
    } else {
      throw new Error("No implement on Controller reaction meta")
    }
  }
  destory(): void {
    throw new Error("Method not implemented.");
  }

}