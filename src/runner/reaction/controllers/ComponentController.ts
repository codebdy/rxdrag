import { INIT_EVENT_NAME, DESTORY_EVENT_NAME } from "react-shells/ant5/shared/createReactionSchema";
import { EventFuncs, IComponentController, InputFunc, PropsListener, Reactions, UnListener, VariableListener } from "runner/reaction/interfaces/controller";
import { IReactionMaterial } from "../interfaces/material";
import { IControllerMeta, IReactionDefineMeta } from "../interfaces/metas";
import { CodeReaction } from "./CodeReaction";
import { GraphicalReaction } from "./GraphicalReaction";


export class ComponentController implements IComponentController {
  id: string;
  name?: string;
  initEvent?: InputFunc | undefined;
  destoryEvent?: InputFunc | undefined;
  events: EventFuncs = {};
  reactions: Reactions = {};

  constructor(meta: IControllerMeta, protected parentReactions: Reactions, protected materials: IReactionMaterial[]) {
    this.id = meta.id!
    for (const reactionMeta of meta.reactions || []) {
      const reaction = this.makeReaction(reactionMeta)
      if (reaction) {
        this.reactions[reactionMeta.id] = reaction
      }
    }
    for (const eventMeta of meta.events || []) {
      const reaction = this.makeReaction(eventMeta)
      if (!reaction) {
        continue
      }
      const inputOne = reaction.inputs[Object.keys(reaction.inputs)[0]]
      if (!inputOne) {
        continue
      }
      if (eventMeta.name === INIT_EVENT_NAME) {
        this.initEvent = inputOne.push
      } else if (eventMeta.name === DESTORY_EVENT_NAME) {
        this.destoryEvent = inputOne.push
      } else if (eventMeta.name) {
        this.events[eventMeta.name] = inputOne.push
      }
    }
  }

  setVariable(name: string, value: any): void {
    throw new Error("Method not implemented.");
  }
  subcribeToVariableChange(name: string, listener: VariableListener): UnListener {
    throw new Error("Method not implemented.");
  }
  subscribeToPropsChange(listener: PropsListener): UnListener {
    throw new Error("Method not implemented.");
  }

  private makeReaction(reactionMeta: IReactionDefineMeta) {
    if (reactionMeta.logicMetas) {
      return new GraphicalReaction(reactionMeta, this.materials)
    } else if (reactionMeta.jsCode) {
      return new CodeReaction(reactionMeta)
    }
  }
}