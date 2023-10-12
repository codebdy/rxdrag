import { IField, IForm } from "../interfaces/fieldy";

export class PropExpression {
  private previousValue: unknown
  constructor(
    private fieldyNode: IField | IForm,
    public propName: string,
    private expression: string,
    private params: Record<string, unknown> = {}
  ) { }

  public changedValue() {
    const $form = (this.fieldyNode as IField).form ?? this.fieldyNode;
    const siblingFields = this.getSiblings() || [];
    const siblings: Record<string, unknown> = {}
    for (const sibling of siblingFields) {
      if (sibling.meta?.name) {
        siblings[sibling.meta?.name] = sibling.getValue();
      }
    }

    try {
      if (!this.expression?.trim()) {
        return
      }
      const fn = new Function(
        "$form",
        "parent",
        ...Object.keys(siblings),
        ...Object.keys(this.params),
        "return " + this.expression)

      const value = fn(
        $form,
        (this.fieldyNode as IField).form ? (this.fieldyNode as IField).getParent()?.getValue() : undefined,
        ...Object.values(siblings),
        ...Object.values(this.params),
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

  private getSiblings() {
    if ((this.fieldyNode as IField)?.form) {
      return (this.fieldyNode as IField).getSiblings()
    } else if (this.fieldyNode) {
      return (this.fieldyNode as IForm).getRootFields()
    }
  }
}