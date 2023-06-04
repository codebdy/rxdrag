/* eslint-disable @typescript-eslint/no-explicit-any */
import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

@Activity(ObjectToUrl.NAME)
export class ObjectToUrl extends AbstractActivity {
  public static NAME = "system.objectUrl"

  constructor(meta: IActivityDefine) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: any): void => {
    const params: string[] = []

    for (const key of Object.keys(inputValue || {})) {
      params.push(key + "=" + inputValue?.[key])
    }
    this.next(params.join("&"))
  }
}