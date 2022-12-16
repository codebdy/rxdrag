import { configureStore, Store } from "@reduxjs/toolkit";
import { invariant } from "core/utils/util-invariant";
import { CREATE_FORM, REMOVE_FORM, SetFormFieldsPayload, SetFormValuesPayload, SET_FORM_FIELDS, SET_FORM_FLAT_VALUES, SET_FORM_INITIAL_VALUES, SET_FORM_VALUES } from "fieldy/actions";
import { FieldChangeListener, FieldState, FormActionPlayload, FormChangeListener, FormState, FormValue, FormValuesChangeListener, IAction, IFieldSchema, IFieldyEngine, IFormProps, Listener, Unsubscribe } from "fieldy/interfaces";
import { reduce, State } from "fieldy/reducers";

var idSeed = 0

function makeId(){
  idSeed = idSeed + 1;

  return "form-"+idSeed
}

/**
 * 建议一个应用只创建一个Fieldy实例
 */
export class FieldyEngine implements IFieldyEngine {
  store: Store<State>
  constructor(debugMode?: boolean,) {
    this.store = makeStoreInstance(debugMode || false)
  }

  createForm(options?: IFormProps): string {
    const name = makeId()
    this.dispatch({
      type: CREATE_FORM,
      payload: {
        formName: name,
      }
    })

    return name
  }

  removeForm(name: string): void {
    this.dispatch({
      type: REMOVE_FORM,
      payload: {
        formName: name,
      }
    })
  }

  setFormSchema(name: string, fieldSchemas: IFieldSchema[]): void {
    const payload: SetFormFieldsPayload = {
      formName: name,
      fieldSchemas
    }
    this.dispatch(
      {
        type: SET_FORM_FIELDS,
        payload: payload,
      }
    )
  }

  setFormInitialValue(name: string, value: FormValue): void {
    this.store.dispatch({
      type: SET_FORM_INITIAL_VALUES,
      payload: {
        formName: name,
        values: value,
      }
    })
  }

  setFormValues(name: string, value: FormValue): void {
    this.store.dispatch({
      type: SET_FORM_VALUES,
      payload: {
        formName: name,
        values: value,
      }
    })
  }

  setFormFlatValues(name: string, flatValues: FormValue): void {
    const payload: SetFormValuesPayload = {
      formName: name,
      values: flatValues
    }
    this.dispatch(
      {
        type: SET_FORM_FLAT_VALUES,
        payload: payload,
      }
    )
  }

  getForm(name: string): FormState | undefined {
    return this.store.getState().forms[name]
  }
  subscribeToFormInitialized(name: string, listener: Listener): Unsubscribe {
    invariant(typeof listener === 'function', 'listener must be a function.')

    let previousState = this.store.getState().forms[name]
    const handleChange = () => {
      const nextState = this.store.getState().forms[name]
      if (nextState?.initialized === previousState?.initialized) {
        return
      }
      previousState = nextState
      listener()
    }

    return this.store.subscribe(handleChange)
  }

  subscribeToFormValuesChange(name: string, listener: FormValuesChangeListener): Unsubscribe {
    invariant(typeof listener === 'function', 'listener must be a function.')

    let previousState = this.store.getState().forms[name]
    const handleChange = () => {
      let changed = false
      const nextState = this.store.getState().forms[name]
      if (nextState === previousState || !nextState?.modified) {
        return
      }

      for (const key of Object.keys(nextState?.fields || {})) {
        if (previousState?.fields[key]?.value !== nextState?.fields[key]?.value) {
          changed = true
        }
      }
      const normalValues = getFormNormalValues(nextState)
      const flatValues = getFormFlatValues(nextState)
      previousState = nextState
      if (changed) {
        listener(normalValues, flatValues)
      }
    }

    return this.store.subscribe(handleChange)
  }

  setFieldValue(formName: string, fieldPath: string, value: any): void {
    throw new Error("Method not implemented.");
  }

  setSubFields(formName: string, fieldPath: string, subFieldSchemas: IFieldSchema[]): void {
    throw new Error("Method not implemented.");
  }

  addSubFields(formName: string, fieldPath: string, subFieldSchemas: IFieldSchema[]): void {
    throw new Error("Method not implemented.");
  }

  removeSubFields(formName: string, fieldPath: string, ...subFieldNames: string[]): void {
    throw new Error("Method not implemented.");
  }

  getFormValues(formName: string): FormValue {
    const formState = this.store.getState().forms[formName]
    return getFormNormalValues(formState)
  }

  getFormFlatValues(formName: string): FormValue {
    const formState = this.store.getState().forms[formName]
    return getFormFlatValues(formState)
  }

  getField(formName: string, fieldPath: string): FieldState | undefined {
    const state = this.store.getState()
    return state.forms[formName]?.fields?.[fieldPath]
  }

  subscribeToFormChange(name: string, listener: FormChangeListener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  subscribeToFieldChange(formName: string, path: string, listener: FieldChangeListener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  dispatch(action: IAction<FormActionPlayload>): void {
    this.store.dispatch(action)
  }
}

function makeStoreInstance(debugMode: boolean): Store<State> {
  // TODO: if we ever make a react-native version of this,
  // we'll need to consider how to pull off dev-tooling
  const reduxDevTools =
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
  return configureStore(
    {
      reducer: reduce,
      devTools: debugMode &&
        reduxDevTools &&
        reduxDevTools({
          name: 'dnd-core',
          instanceId: 'dnd-core',
        }),
    }
  )
}

function getFormNormalValues(formState: FormState | undefined) {
  if (!formState) {
    return {}
  }
  const flatValues = getFormFlatValues(formState)
  return trasformFlatValuesToNormal(JSON.parse(JSON.stringify(formState.originalValue || {})), flatValues, formState.fieldSchemas)
}

function getFormFlatValues(formState: FormState | undefined) {
  if (!formState) {
    return {}
  }
  const flatValues: FormValue = {}
  for (const key of Object.keys(formState?.fields || {})) {
    flatValues[key] = formState?.fields[key]?.value
  }

  return flatValues
}

function trasformFlatValuesToNormal(originalValue: any = {}, flatValues: FormValue, fieldSchemas: IFieldSchema[], basePath?: string) {
  const value: FormValue = originalValue
  for (const fieldSchema of fieldSchemas) {
    const prefix = basePath ? basePath + "." : ""
    const fieldPath = prefix + fieldSchema.name
    if (fieldSchema.type === "object") {
      value[fieldSchema.name] = trasformFlatValuesToNormal(value[fieldSchema.name], flatValues, fieldSchema.fields, fieldPath)
    } else if (fieldSchema.type === "array") {
      const objectValue = trasformFlatValuesToNormal(value[fieldSchema.name], flatValues, fieldSchema.fields, fieldPath)
      const arrayValue = []
      for (const key of Object.keys(objectValue)) {
        arrayValue[parseInt(key)] = objectValue[key]
      }
      value[fieldSchema.name] = arrayValue
    } else {
      value[fieldSchema.name] = flatValues[fieldPath]
    }
  }
  return value
}