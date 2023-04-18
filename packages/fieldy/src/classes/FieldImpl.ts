/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorListener, FormState, IField, IFieldyEngine, IForm, Listener, Unsubscribe, ValueChangeListener } from "../interfaces";

export class FieldImpl implements IField {
  refCount = 1;

  constructor(public fieldy: IFieldyEngine, public form: IForm, private fieldPath: string) {
    if (this.meta?.reactionMeta) {
      //初始化完成时，计算一次联动
      form.fieldy.subscribeToFormInitialized(form.name, this.handleFieldReaction)
      form.fieldy.subscribeToFormChange(form.name, this.handleFieldReaction)
    }
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

  setValue(value: unknown): void {
    this.fieldy.setFieldValue(this.form.name, this.path, value)
  }

  setInitialValue(value: unknown): void {
    this.fieldy.setFieldIntialValue(this.form.name, this.path, value)
  }

  inpuValue(value: unknown): void {
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

  /**
   * 表单变化响应函数：处理联动
   * @param form 
   */
  private handleFieldReaction = (form: FormState) => {
    throw new Error("Not implement")
  }
}