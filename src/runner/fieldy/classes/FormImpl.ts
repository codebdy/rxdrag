import { ErrorListener, FieldState, IField, IFieldSchema, IFieldyEngine, IForm, Listener, Unsubscribe, ValueChangeListener } from "../interfaces";

function getFieldKey(formName: string, path: string) {
  return formName + "#" + path
}

export class FormImpl implements IForm {
  fields: {
    [key: string]: IField | undefined
  } = {}

  constructor(private fieldy: IFieldyEngine, public name: string) { }

  getFieldState(fieldPath: string): FieldState | undefined {
    return this.fieldy.getFieldState(this.name, fieldPath)
  }

  getField(path: string): IField | undefined {
    return this.fields[getFieldKey(this.name, path)]
  }

  registerField(fieldSchema: IFieldSchema): IField {
    throw new Error("Method not implemented.");
  }
  unregisterField(path: string): void {
    throw new Error("Method not implemented.");
  }
  setValue(value: any): void {
    throw new Error("Method not implemented.");
  }
  setInitialValue(value: any): void {
    throw new Error("Method not implemented.");
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
  onInitialValuesChange(): Unsubscribe {
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