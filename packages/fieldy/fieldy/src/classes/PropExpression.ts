import { IField, IForm } from "../interfaces/fieldy";

export class PropExpression {
  private previousValue: unknown
  constructor(
    private parentNode: IField | IForm,
    public propName: string,
    private expression: string,
    private params: Record<string, unknown> = {}
  ) { }

  public changedValue() {
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
        "query",
        "parent",
        ...Object.keys(siblings),
        ...Object.keys(this.params),
        "return " + this.expression)

      const value = fn(
        this.query,
        (this.parentNode as IField).form ? (this.parentNode as IField).getParent()?.getValue() : undefined,
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
    if ((this.parentNode as IField)?.form) {
      return (this.parentNode as IField).getSubFields()
    } else if (this.parentNode) {
      return (this.parentNode as IForm).getRootFields()
    }
  }

  //目前仅支持绝对路径，以后改成相对路径可查
  query = (path: string) => {
    const form = (this.parentNode as IField).form ?? this.parentNode;
    form.getField(path)?.getValue()
  }
}