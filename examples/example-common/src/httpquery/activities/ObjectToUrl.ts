/* eslint-disable @typescript-eslint/no-explicit-any */
import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

@Activity(ObjectToUrl.NAME)
export class ObjectToUrl extends AbstractActivity {
  public static NAME = "system.objectUrl"

  constructor(meta: INodeDefine) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: any, runContext?: object): void => {
    const params: string[] = []

    for (const key of Object.keys(inputValue || {})) {
      inputValue?.[key] && params.push(key + "=" + inputValue?.[key])
    }
    this.next(params.join("&"), runContext)
  }
}