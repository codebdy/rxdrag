import { ErrorListener, IValidationError, IValidationSubscriber, Listener, SuccessListener, Unsubscribe } from "../interfaces";

export class ValidationSubscriber implements IValidationSubscriber {
  private startListeners: Listener[] = []
  private endListeners: Listener[] = []
  private failedListeners: ErrorListener[] = []
  private successListeners: SuccessListener[] = []

  emitStart() {
    for (const listener of this.startListeners) {
      listener()
    }
  }

  emitEnd() {
    for (const listener of this.endListeners) {
      listener()
    }
  }

  emitFailed(errors: IValidationError[]) {
    for (const listener of this.failedListeners) {
      listener(errors)
    }
  }

  emitSuccess(value: unknown) {
    for (const listener of this.successListeners) {
      listener(value)
    }
  }

  onValidateStart(listener: Listener): Unsubscribe {
    this.startListeners.push(listener)
    return () => {
      this.startListeners.splice(this.startListeners.indexOf(listener), 1)
    }
  }
  onValidateEnd(listener: Listener): Unsubscribe {
    this.endListeners.push(listener)
    return () => {
      this.endListeners.splice(this.endListeners.indexOf(listener), 1)
    }
  }
  onValidateFailed(listener: ErrorListener): Unsubscribe {
    this.failedListeners.push(listener)
    return () => {
      this.failedListeners.splice(this.failedListeners.indexOf(listener), 1)
    }
  }
  onValidateSuccess(listener: SuccessListener): Unsubscribe {
    this.successListeners.push(listener)
    return () => {
      this.successListeners.splice(this.successListeners.indexOf(listener), 1)
    }
  }

}