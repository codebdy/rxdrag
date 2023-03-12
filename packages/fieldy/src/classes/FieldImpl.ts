import { ErrorListener, IField, IFieldyEngine, IForm, Listener, Unsubscribe, ValueChangeListener } from "../interfaces";

export class FieldImpl implements IField {
  refCount: number = 1;

  constructor(private fieldy: IFieldyEngine, private form: IForm, private fieldPath: string) {
  }


  get value() {
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

  setValue(value: any): void {
    this.fieldy.setFieldValue(this.form.name, this.path, value)
  }

  setInitialValue(value: any): void {
    this.fieldy.setFieldIntialValue(this.form.name, this.path, value)
  }

  inpuValue(value: any): void {
    this.fieldy.inputFieldValue(this.form.name, this.path, value)
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
    return this.fieldy.subscribeToFieldValueChange(this.form.name, this.path || "", listener)
  }
  onInitialValueChange(): Unsubscribe {
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