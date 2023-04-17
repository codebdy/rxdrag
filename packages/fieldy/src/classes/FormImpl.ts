import { ErrorListener, FieldState, IField, IFieldSchema, IFieldyEngine, IForm, Listener, Unsubscribe, ValueChangeListener } from "../interfaces";
import { FieldImpl } from "./FieldImpl";

export class FormImpl implements IForm {
  fields: {
    [key: string]: IField | undefined
  } = {}

  constructor(private fieldy: IFieldyEngine, public name: string) { }

  initialValue?: any;
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
      if (fieldSchema.name) {
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

  setValue(value: any): void {
    throw new Error("Method not implemented.");
  }
  setInitialValue(value: any): void {
    this.fieldy.setFormInitialValue(this.name, value)
  }
  inpuValue(value: any): void {
    throw new Error("Method not implemented.");
  }
  validate(): void {
    throw new Error("Method not implemented.");
  }
  onInit(listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onMount(listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onUnmount(listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValueChange(listener: ValueChangeListener): Unsubscribe {
    return this.fieldy.subscribeToFormValuesChange(this.name, listener)
  }
  onInitialValueChange(): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onInput(listener: ValueChangeListener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValidateStart(listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValidateEnd(listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValidateFailed(listener: ErrorListener): Unsubscribe {
    throw new Error("Method not implemented.");
  }
  onValidateSuccess(listener: Listener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

}