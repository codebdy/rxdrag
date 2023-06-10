/* eslint-disable @typescript-eslint/no-unused-vars */
import { isStr } from "@rxdrag/shared";
import { ErrorListener, FormState, IField, IFieldyEngine, IForm, Listener, Unsubscribe, ValueChangeListener } from "../interfaces";
import { PropExpression } from "./PropExpression";

export class FieldImpl implements IField {
  refCount = 1;
  expressions: PropExpression[] = []
  //发起变化标号，防止无限递归
  initiateExpressionChange = false;
  constructor(public fieldy: IFieldyEngine, public form: IForm, private fieldPath: string) {
    if (this.meta?.reactionMeta) {
      this.makeExpressions();
      //初始化完成时，计算一次联动
      //form.fieldy.subscribeToFormInitialized(form.name, this.handleFieldReaction)
      form.fieldy.subscribeToFormChange(form.name, this.handleFieldReaction)
    }
  }
  // unmount(): void {
  //   ;
  // }

  // mount(): void {
  //   throw new Error("Method not implemented.");
  // }

  getInitialValue(): unknown {
    return this.fieldy.getFieldInitialValue(this.form.name, this.fieldPath)
  }

  getValue() {
    return this.fieldy.getFieldValue(this.form.name, this.fieldPath)
  }

  get meta() {
    return this.fieldy.getFieldState(this.form.name, this.fieldPath)?.meta
  }

  get path() {
    return this.fieldPath
  }

  get basePath() {
    return this.fieldy.getFieldState(this.form.name, this.fieldPath)?.basePath
  }

  destory(): void {
    throw new Error("Method not implemented.");
  }

  setValue(value: unknown): void {
    this.fieldy.setFieldValue(this.form.name, this.path, value)
  }

  setInitialValue(value: unknown): void {
    this.fieldy.setFieldInitialValue(this.form.name, this.path, value)
  }

  setDefaultValue(value: unknown): void {
    this.fieldy.setFieldDefaultValue(this.form.name, this.path, value)
  }

  inputValue(value: unknown): void {
    this.fieldy.inputFieldValue(this.form.name, this.path, value)
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }

  onInit(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onMount(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onUnmount(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onValueChange(listener: ValueChangeListener): Unsubscribe {
    return this.fieldy.subscribeToFieldValueChange(this.form.name, this.path || "", listener)
  }
  onInitialValueChange(): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  onValidateStart(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValidateEnd(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValidateFailed(_listener: ErrorListener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValidateSuccess(_listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  private makeExpressions() {
    if (this.meta?.reactionMeta) {
      for (const key of Object.keys(this.meta.reactionMeta)) {
        const exobj = this.meta.reactionMeta[key]
        const expressionText = (exobj as { expression?: string })?.expression
        if (expressionText) {
          this.expressions.push(new PropExpression(this, key, expressionText))
        } else if (isStr(exobj)) {
          let expressionText = exobj.trim()
          if (expressionText.startsWith("{{") && expressionText.endsWith("}}")) {
            expressionText = expressionText.replace(/^\{\{/, "").replace(/\}\}$/, "");
          }
          if (expressionText) {
            this.expressions.push(new PropExpression(this, key, expressionText))
          }
        }
      }
    }
  }

  /**
   * 表单变化响应函数：处理联动
   * @param form 
   */
  private handleFieldReaction = (form: FormState) => {
    // if(!form.initialized){
    //   return
    // }
    const updatedValues: { [key: string]: unknown } = {}
    if(this.initiateExpressionChange){
      this.initiateExpressionChange = false;
      return
    }
    for(const expresion of this.expressions){
      const {value, changed} = expresion.changedValue()
      if(changed){
        updatedValues[expresion.propName] = value
      }
    }
    if(Object.keys(updatedValues).length > 0){
      const oldFieldState = this.fieldy.getFieldState(this.form.name, this.fieldPath)
      console.assert(oldFieldState, "FieldState is undefined!")
      this.initiateExpressionChange = true;
      oldFieldState && this.fieldy.setFieldState(this.form.name, {...oldFieldState, ...updatedValues})
    }
  }
}