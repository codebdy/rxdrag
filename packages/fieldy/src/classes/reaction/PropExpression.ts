import { IField } from "../../interfaces";

export class PropExpression {
  private previousValue: unknown
  constructor(private field: IField, public propName: string, private expression: string) { }

  public changedValue() {
    const $self = this.field;
    const $form = this.field.form;
    new Function("return " + this.expression)()?.({ $self, $form })
    return { value: "", changed: false }
  }
}