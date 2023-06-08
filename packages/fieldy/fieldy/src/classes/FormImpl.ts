/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorListener, FieldState, FormValue, IField, IFieldSchema, IFieldyEngine, IForm, Listener, Unsubscribe, ValueChangeListener } from "../interfaces";
import { FieldImpl } from "./FieldImpl";

export class FormImpl implements IForm {
  fields: {
    [key: string]: IField | undefined
  } = {}

  constructor(public fieldy: IFieldyEngine, public name: string) { }

  initialValue?: unknown;
  get value() {
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
      if (fieldSchema.name || fieldSchema.type === "fragment") {
        //这段代码可能需要重构未：如果已经存在Field定义，则合并
        if(!this.fieldy.getFieldState(this.name, fieldSchema.path)){
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

  setValue(value: unknown): void {
    this.fieldy.setFormValue(this.name, value as FormValue)
  }
  setInitialValue(value: unknown): void {
    this.fieldy.setFormInitialValue(this.name, value as FormValue)
  }
  inpuValue(_value: unknown): void {
    throw new Error("Method not implemented.");
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
    return this.fieldy.subscribeToFormValuesChange(this.name, listener)
  }
  onInitialValueChange(): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onInput(_listener: ValueChangeListener): Unsubscribe {
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

}