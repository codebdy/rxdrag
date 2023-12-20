/* eslint-disable @typescript-eslint/no-unused-vars */
import { IValidateSchema, IValidationError } from "../interfaces";
import { ErrorListener, ExpContextChangeListener, FieldState, FormValue, IField, IFieldSchema, IFieldyEngine, IForm, Listener, SuccessListener, Unsubscribe, ValidateResult, ValidateStatus, ValueChangeListener } from "../interfaces/fieldy";
import { FieldImpl, transformErrorsToFeedbacks } from "./FieldImpl";
import { ValidationSubscriber } from "./ValidationSubscriber";

export class FormImpl implements IForm {
  expContextListeners: ExpContextChangeListener[] = []
  fields: Record<string, IField> = {}
  validationSubscriber: ValidationSubscriber = new ValidationSubscriber()
  //表达式中用到的变量
  private expContext?: Record<string, unknown>

  constructor(
    public fieldy: IFieldyEngine,
    public name: string,
  ) { }

  getExpContext(): Record<string, unknown> | undefined {
    return this.expContext
  }

  setExpContext(expContext?: Record<string, unknown> | undefined): void {
    this.expContext = expContext
    for (const listener of this.expContextListeners) {
      listener(this.expContext)
    }
  }

  reset(): void {
    this.fieldy.resetForm(this.name)
  }

  getModified(): boolean {
    return this.fieldy.getFormState(this.name)?.modified || false
  }

  unmount(): void {
    throw new Error("Method not implemented.");
  }

  mount(): void {
    throw new Error("Method not implemented.");
  }

  // getDefaultValue(): FormValue | undefined {
  //   return this.fieldy.getFormDefaultValue(this.name)
  // }
  getInitialValue() {
    return this.fieldy.getFormInitialValue(this.name)
  }

  getValue() {
    return this.fieldy.getFormValue(this.name)
  }

  getFieldState(fieldPath: string): FieldState | undefined {
    return this.fieldy.getFieldState(this.name, fieldPath)
  }

  getField(path: string): IField | undefined {
    return this.fields[path]
  }

  queryField(pathExp: string): IField<IValidateSchema> | undefined {
    throw new Error("Method not implemented.");
  }

  registerField(fieldSchema: IFieldSchema): IField {
    const field = this.getField(fieldSchema.path)
    if (field) {
      field.refCount = field.refCount + 1
      return field
    } else {
      if (fieldSchema.name) {
        //这段代码可能需要重构未：如果已经存在Field定义，则合并
        if (!this.fieldy.getFieldState(this.name, fieldSchema.path)) {
          this.fieldy.addFields(this.name, fieldSchema)
        }
        const field = new FieldImpl(this.fieldy, this, fieldSchema.path) as IField
        this.fields[fieldSchema.path] = field
        return field
      }
      throw new Error("Not set field name")
    }

  }

  unregisterField(path: string): void {
    const field = this.getField(path)
    if (field) {
      field.refCount = field.refCount - 1
      if (field.refCount <= 0) {
        field.destroy()
        this.fieldy.removeField(this.name, path)
        delete this.fields[path]
      }
    }
  }

  setValue(value: FormValue | undefined): void {
    this.fieldy.setFormValue(this.name, value)
  }
  setInitialValue(value: FormValue | undefined): void {
    this.fieldy.setFormInitialValue(this.name, value)
  }
  // setDefaultValue(value: FormValue | undefined): void {
  //   this.fieldy.setFormDefaultValue(this.name, value)
  // }
  async validate() {
    if (this.fieldy.validator) {
      this.validationSubscriber.emitStart()
      const fieldsSchemas = this.getFieldSchemas()
      try {
        const value = await this.fieldy.validator.validateForm(this)
        this.fieldy.setValidationFeedbacks(this.name, transformErrorsToFeedbacks([], fieldsSchemas))
        this.validationSubscriber.emitSuccess(value)
        return {
          status: ValidateStatus.success,
          value
        }
      } catch (errors) {
        this.fieldy.setValidationFeedbacks(this.name, transformErrorsToFeedbacks(errors as IValidationError[], fieldsSchemas))
        this.validationSubscriber.emitFailed(errors as IValidationError[])
        return {
          status: ValidateStatus.error,
          errors: errors as IValidationError[]
        }
      } finally{
        this.validationSubscriber.emitEnd()
      }
    } else {
      console.error("Not set validator")
      return {
        status: ValidateStatus.error,
        message: "Not set validator"
      }
    }

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
    return this.fieldy.subscribeToFormValuesChange(this.name, listener)
  }
  onInitialValueChange(): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onInput(_listener: ValueChangeListener): Unsubscribe {
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

  getFieldSchemas() {
    return this.fieldy.getFormState(this.name)?.fieldSchemas || []
  }

  getRootFieldSchemas() {
    const fieldSchemas = this.fieldy.getFormState(this.name)?.fieldSchemas || []
    const children: IFieldSchema[] = []
    for (const child of fieldSchemas) {
      if (child.path.indexOf(".") < 0) {
        children.push(child)
      }
    }
    return children
  }

  getRootFields(): IField<IValidateSchema>[] {
    const fields: IField<IValidateSchema>[] = []
    const fieldStates = this.getRootFieldSchemas()
    for (const fieldState of fieldStates) {
      const field = this.getField(fieldState.path)
      if (field) {
        fields.push(field)
      }
    }
    return fields
  }

  onExpContextChange(listener: ExpContextChangeListener): Unsubscribe {
    this.expContextListeners.push(listener)

    return () => {
      this.expContextListeners.splice(this.expContextListeners.indexOf(listener), 1)
    }
  }

}