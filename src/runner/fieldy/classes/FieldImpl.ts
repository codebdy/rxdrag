import { ErrorListener, IField, IFieldyEngine, Listener, Unsubscribe, ValueChangeListener } from "../interfaces";

export class FieldImpl implements IField {
  refCount: number = 1;

  constructor(private fieldy: IFieldyEngine, private formName: string, private fieldPath: string) {
  }


  get value() {
    return this.fieldy.getFieldValue(this.formName, this.fieldPath)
  }

  get meta() {
    return this.fieldy.getFieldState(this.formName, this.fieldPath)?.meta
  }

  get path() {
    return this.fieldPath
  }

  get basePath() {
    return this.fieldy.getFieldState(this.formName, this.fieldPath)?.basePath
  }

  destory(): void {
    throw new Error("Method not implemented.");
  }

  setValue(value: any): void {
    throw new Error("Method not implemented.");
  }
  setInitialValue(value: any): void {
    this.fieldy.setFieldIntialValue(this.formName, this.path, value)
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
    return this.fieldy.subscribeToFieldValueChange(this.formName, this.path || "", listener)
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