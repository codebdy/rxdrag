/* eslint-disable @typescript-eslint/no-unused-vars */
import { isStr } from "@rxdrag/shared";
import { ErrorListener, FieldState, FormState, IField, IFieldSchema, IFieldyEngine, IForm, Listener, SuccessListener, Unsubscribe, ValueChangeListener } from "../interfaces/fieldy";
import { PropExpression } from "./PropExpression";
import { ValidationSubscriber } from "./ValidationSubscriber";
import { IValidateSchema, IValidationError } from "../interfaces";
import { IFieldFeedback } from "../actions";
import { getChildFields } from "../funcs/path";

export function transformErrorsToFeedbacks(errors: IValidationError[], schemas: IFieldSchema[]): IFieldFeedback[] {
  const feedbacks: IFieldFeedback[] = []
  for (const schema of schemas) {
    const error = errors.find(err => err.path === schema.path)
    if (error) {
      feedbacks.push({ path: schema.path, type: "error", messages: [error.message || "no error message"] })
    } else {
      feedbacks.push({ path: schema.path, type: "success" })
    }
  }
  return feedbacks
}

export class FieldImpl implements IField {
  refCount = 1;
  expressions: PropExpression[] = []
  //发起变化标号，防止无限递归
  initiateExpressionChange = false;
  validationSubscriber: ValidationSubscriber = new ValidationSubscriber()
  unsubValueChange?: Unsubscribe
  unsubExpContextChange?: Unsubscribe

  constructor(public fieldy: IFieldyEngine, public form: IForm, private fieldPath: string) {
    if (this.meta?.reactionMeta) {
      this.makeExpressions();
      //计算一次联动
      this.handleFieldReaction()
      this.unsubValueChange = form.onValueChange(this.handleFieldReaction)
      this.unsubExpContextChange = form.onExpContextChange(this.handleFieldReaction)
    }
  }

  getSiblings(): IField<IValidateSchema>[] {
    const fields: IField<IValidateSchema>[] = []
    const fieldStates = getChildFields(this.fieldy.getFormState(this.form.name)?.fields || {}, this.basePath)
    for (const fieldState of fieldStates) {
      const field = this.form.getField(fieldState.basePath + "." + fieldState.name)
      if (field) {
        fields.push(field)
      }
    }
    return fields
  }

  getParent(): IField<IValidateSchema> | undefined {
    if (this.basePath) {
      return this.form.getField(this.basePath)
    }
  }

  getSubFieldSchemas(): IFieldSchema[] | undefined {
    if (this.meta?.type === "object" || this.meta?.type === "array") {
      return this.form.fieldy.getFormState(this.form.name)?.fieldSchemas?.filter(schema => {
        return schema.path !== this.path && schema.path.startsWith(this.path)
      })
    }

    return undefined
  }

  getFieldSchema(): IFieldSchema {
    return this.fieldy.getFormState(this.form.name)?.fieldSchemas.find(schema => schema.path === this.path) || { path: this.path, ...this.meta }
  }

  getModified(): boolean {
    throw this.fieldy.getFieldState(this.form.name, this.fieldPath)?.modified;
  }

  getDefaultValue(): unknown {
    return this.fieldy.getFieldDefaultValue(this.form.name, this.fieldPath)
  }

  getInitialValue(): unknown {
    return this.fieldy.getFieldInitialValue(this.form.name, this.fieldPath)
  }

  getState(): FieldState | undefined {
    return this.fieldy.getFieldState(this.form.name, this.fieldPath)
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

  destroy(): void {
    this.unsubValueChange?.()
    this.unsubValueChange?.()
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
    if (this.fieldy.validator) {
      this.validationSubscriber.emitStart()
      this.fieldy.validator.validateField(this).then((value: unknown) => {
        this.validationSubscriber.emitSuccess(value)
      }).catch((errors: IValidationError[]) => {
        const fieldSchema = this.getFieldSchema()
        const subFields = this.getSubFieldSchemas()
        this.fieldy.setValidationFeedbacks(this.form.name, transformErrorsToFeedbacks(errors, [fieldSchema, ...subFields || []]))
        this.validationSubscriber.emitFailed(errors)
      }).finally(() => {
        this.validationSubscriber.emitEnd()
      })
    } else {
      console.error("Not set validator")
    }
  }

  reset(): void {
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

  onValidateStart(listener: Listener): Unsubscribe {
    return this.validationSubscriber.onValidateStart(listener)
  }
  onValidateEnd(listener: Listener): Unsubscribe {
    return this.validationSubscriber.onValidateEnd(listener)
  }
  onValidateFailed(listener: ErrorListener): Unsubscribe {
    return this.validationSubscriber.onValidateFailed(listener)
  }
  onValidateSuccess(listener: SuccessListener): Unsubscribe {
    return this.validationSubscriber.onValidateSuccess(listener)
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
  private handleFieldReaction = () => {
    // if(!form.initialized){
    //   return
    // }
    const updatedValues: { [key: string]: unknown } = {}
    if (this.initiateExpressionChange) {
      this.initiateExpressionChange = false;
      return
    }
    for (const expression of this.expressions) {
      const { value, changed } = expression.changedValue() || {}
      if (changed) {
        updatedValues[expression.propName] = value
      }
    }
    if (Object.keys(updatedValues).length > 0) {
      const oldFieldState = this.fieldy.getFieldState(this.form.name, this.fieldPath)
      console.assert(oldFieldState, "FieldState is undefined!")
      this.initiateExpressionChange = true;
      oldFieldState && this.fieldy.setFieldState(this.form.name, { ...oldFieldState, ...updatedValues })
    }
  }
}