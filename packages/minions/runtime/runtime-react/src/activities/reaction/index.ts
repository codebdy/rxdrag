import { Activity, DynamicInput } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { ControllerActivity, IControllerConfig } from "../ControllerActivity";
import { isFn } from "@rxdrag/shared";

export interface IReactionConfig extends IControllerConfig {
  name?: string
}

@Activity(Reaction.NAME)
export class Reaction extends ControllerActivity<IReactionConfig> {
  public static NAME = "system-react.reaction"

  constructor(meta: INodeDefine<IReactionConfig>, context: IControllerContext) {
    super(meta, context)
  }

  @DynamicInput
  inputHandler = (inputName: string, inputValue: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reaction = (this.controller as any)?.[inputName]
    if (isFn(reaction)) {
      reaction(inputValue)
    } else {
      console.error("controller reaction is error:", inputName)
    }
    this.next(inputValue);
  };

}