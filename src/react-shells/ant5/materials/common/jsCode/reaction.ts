import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { ReactionFactory } from "runner/reaction/interfaces/controller";

export interface IJsCodeConfig extends IConfigMeta {
  expression?: string
}

export class JsCodeReaction extends AbstractReaction<IJsCodeConfig> {

  constructor(meta: IReactionMeta<IJsCodeConfig>) {
    super(meta)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("JsCodeReaction inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (this.meta.config?.expression) {

    }
  }

}

export const JsCode: ReactionFactory = (meta: IReactionMeta<IJsCodeConfig>) => {
  return new JsCodeReaction(meta)
}