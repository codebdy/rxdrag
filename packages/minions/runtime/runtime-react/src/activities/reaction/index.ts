import { Activity, DynamicInput } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IReactContext } from "../../interfaces";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";
import { isFn } from "@rxdrag/shared";

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
  inputHandler = (inputName: string, inputValue: unknown) => {
    const reaction = this.context?.reactions?.[inputName]
    if (isFn(reaction)) {
      reaction(this.controller, inputValue)
    } else {
      console.error("reaction is error:", inputName)
    }
    this.next(inputValue);
  };

}