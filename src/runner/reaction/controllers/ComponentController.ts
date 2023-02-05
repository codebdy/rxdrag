import { INIT_EVENT_NAME, DESTORY_EVENT_NAME } from "react-shells/ant5/shared/createReactionSchema";
import { ComponentControllers, EventFuncs, IComponentController, InputFunc, IPropController, IReaction, IVariableController, PropsListener,  UnListener, VariableListener } from "runner/reaction/interfaces/controller";
import { IReactionMaterial } from "../interfaces/material";
import { IConfigMeta, IControllerMeta, IReactionDefineMeta, IReactionMeta } from "../interfaces/metas";
import { GraphicalReaction } from "../../../react-shells/ant5/materials/controller/reaction/GraphicalReaction";
import { CodeReaction } from "react-shells/ant5/materials/controller/reaction/CodeReaction";

export class ComponentController implements IComponentController, IVariableController, IPropController {
  id: string;
  name?: string;
  initEvent?: InputFunc | undefined;
  destoryEvent?: InputFunc | undefined;
  events: EventFuncs = {};

  constructor(meta: IControllerMeta, protected parentControllers: ComponentControllers, protected materials: IReactionMaterial[]) {
    this.id = meta.id!
    // for (const reactionMeta of meta.reactions || []) {
    //   const reaction = this.makeReaction(reactionMeta)
    //   if (reaction) {
    //     this.reactions[reactionMeta.id] = reaction
    //   }
    // }
    for (const eventMeta of meta.events || []) {
      const reaction = this.makeReaction(eventMeta)
      if (!reaction) {
        continue
      }
      const inputOne = reaction.inputs[0]
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
  setProp(name: string, value: any): void {
    throw new Error("Method not implemented.");
  }
  createReaction = (meta: IReactionMeta<IConfigMeta>): IReaction => {
    throw new Error("Method not implemented.");
  }

  setVariable = (name: string, value: any): void => {
    throw new Error("Method not implemented.");
  }
  subcribeToVariableChange = (name: string, listener: VariableListener): UnListener => {
    throw new Error("Method not implemented.");
  }
  subscribeToPropsChange = (listener: PropsListener): UnListener => {
    throw new Error("Method not implemented.");
  }

  private makeReaction(reactionMeta: IReactionDefineMeta) {
    if (reactionMeta.logicMetas) {
      return new GraphicalReaction(reactionMeta, this.materials, { variableController: this, propsController: this })
    } else if (reactionMeta.jsCode) {
      return new CodeReaction(reactionMeta)
    }
  }
}