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
    try {
      if (!this.expression?.trim()) {
        return
      }
      console.log("====>", this.expression)
      const value = new Function("$self", "$form", ...Object.keys(sbilings), "return " + this.expression)(
        $self,
        $form,
        ...Object.values(sbilings)
      )
      if (value !== this.previousValue) {
        this.previousValue = value
        return { value, changed: true }
      }
    } catch (e) {
      console.error(e)
    }

    return { undefined, changed: false }
  }
}