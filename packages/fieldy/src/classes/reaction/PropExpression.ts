import { IField } from "../../interfaces";

export class PropExpression {
  private previousValue: unknown
  constructor(private field: IField, public propName: string, private expression: string) { }

  public changedValue() {
    return { value: "", changed: false }
  }
}