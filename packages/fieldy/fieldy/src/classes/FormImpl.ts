/* eslint-disable @typescript-eslint/no-unused-vars */
import { IValidationError } from "../interfaces";
import { ErrorListener, FieldState, FormValue, IField, IFieldSchema, IFieldyEngine, IForm, Listener, SuccessListener, Unsubscribe, ValueChangeListener } from "../interfaces/fieldy";
import { FieldImpl, transformErrorsToFeedbacks } from "./FieldImpl";
import { ValidationSubscriber } from "./ValidationSubscriber";

export class FormImpl implements IForm {
  fields: {
    [key: string]: IField | undefined
  } = {}
  validationSubscriber: ValidationSubscriber = new ValidationSubscriber()

  constructor(public fieldy: IFieldyEngine, public name: string) { }
  
  reset(): void {
    throw new Error("Method not implemented.");
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

  getDefaultValue(): FormValue | undefined {
    return this.fieldy.getFormDefaultValue(this.name)
  }
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
        const field = new FieldImpl(this.fieldy, this, fieldSchema.path)
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
        this.fieldy.removeFields(this.name, path)
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
  setDefaultValue(value: FormValue | undefined): void {
    this.fieldy.setFormDefaultValue(this.name, value)
  }
  validate(): void {
    if (this.fieldy.validator) {
      this.validationSubscriber.emitStart()
      const fieldsSchemas = this.fieldy.getFormState(this.name)?.fieldSchemas || []
      this.fieldy.validator.validateForm(this.getValue(), fieldsSchemas).then((value: unknown) => {
        this.validationSubscriber.emitSuccess(value)
      }).catch((errors: IValidationError[]) => {
        this.fieldy.setValidationFeedbacks(this.name, transformErrorsToFeedbacks(errors, fieldsSchemas))
        this.validationSubscriber.emitFailed(errors)
      }).finally(() => {
        this.validationSubscriber.emitEnd()
      })
    } else {
      console.error("Not set validator")
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

}