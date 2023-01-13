import { IFieldParams, IFieldyEngine } from "runner/fieldy";

export const PREFIX_SELF = "$self";

export class Self {
  constructor(private fieldParams: IFieldParams, private fieldy: IFieldyEngine, private formName: string) { }

  setValue(value: string) {
    if (this.fieldParams.path) {
      this.fieldy.setFieldValue(this.formName, this.fieldParams.path, value)
    } else {
      console.error("Field path is emperty")
    }
  }
}
