import { IField, IFieldyEngine } from "runner/fieldy";

export const PREFIX_SELF = "$self";

export class Self {
  constructor(private field: IField, private fieldy: IFieldyEngine, private formName: string) { }

  setValue(value: string) {
    if (this.field.path) {
      this.fieldy.setFieldValue(this.formName, this.field.path, value)
    } else {
      console.error("Field path is emperty")
    }
  }
}
