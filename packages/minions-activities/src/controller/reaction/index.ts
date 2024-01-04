import { Activity, DynamicInput } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";
import { isFunction } from "lodash";
import { IReactContext } from "@rxdrag/minions-runtime-react";


export interface IReactionConfig extends IControllerConfig {
  name?: string
}

@Activity(Reaction.NAME)
export class Reaction extends ControllerActivity<IReactionConfig> {
  public static NAME = "system-react.reaction"

  constructor(meta: INodeDefine<IReactionConfig>, context: IReactContext) {
    super(meta, context)
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown, runContext?: object) => {
    const reaction = this.context?.reactions?.[inputName]
    if (isFunction(reaction)) {
      const newValue = reaction(this.controller, inputValue)
      this.next(newValue === undefined ? inputValue : newValue, runContext)
    } else {
      console.error("reaction is error:", inputName)
    }
  };

}