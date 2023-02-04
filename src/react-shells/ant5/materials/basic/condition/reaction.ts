import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { ReactionFactory } from "runner/reaction/interfaces/controller";

export interface IConditionConfig extends IConfigMeta {
  trueExpression?: string
}

export class ConditionReaction extends AbstractReaction<IConditionConfig> {

  constructor(meta: IReactionMeta<IConditionConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Condition inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (this.meta.config?.trueExpression) {

    }
  }

}

export const Condition: ReactionFactory = (meta: IReactionMeta<IConditionConfig>) => {
  return new ConditionReaction(meta)
}