import { getChildFields } from "../funcs/path";
import { IField } from "../interfaces";

export class PropExpression {
  private previousValue: unknown
  constructor(private field: IField, public propName: string, private expression: string) { }

  public changedValue() {
    const $self = this.field;
    const $form = this.field.form;
    const siblingFields = getChildFields(this.field.fieldy.getFormState(this.field.form.name)?.fields || {}, this.field.basePath);
    const sbilings: { [key: string]: IField | undefined } = {}
    for (const sibling of siblingFields) {
      if (sibling.path !== this.field.path) {
        sbilings["$" + sibling.name] = this.field.form.getField(sibling.path);
      }
    }
    const value = new Function("return " + this.expression)()?.({ $self, $form, ...sbilings })
    if (value !== this.previousValue) {
      this.previousValue = value
      return { value, changed: true }
    }
    return { undefined, changed: false }
  }
}