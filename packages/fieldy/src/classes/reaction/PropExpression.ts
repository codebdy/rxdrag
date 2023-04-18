import { IField } from "../../interfaces";

export class PropExpression {
  private previousValue: unknown
  constructor(private field: IField, public propName: string, private expression: string) { }

  public changedValue() {
    const $self = this.field;
    const $form = this.field.form;
    const value = new Function("return " + this.expression)()?.({ $self, $form })
    if (value !== this.previousValue) {
      this.previousValue = value
      return { value, changed: true }
    }
    return { undefined, changed: false }
  }
}