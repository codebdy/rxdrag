import { configureStore, Store } from "@reduxjs/toolkit";
import { invariant } from "core/utils/util-invariant";
import { CREATE_FORM, FormActionPlayload, REMOVE_FORM, SetFieldValuePayload, SetFormFieldsPayload, SetFormValuesPayload, SET_FIELD_VALUE, SET_FORM_FIELDS, SET_FORM_FLAT_VALUES, SET_FORM_INITIAL_VALUES, SET_FORM_VALUES } from "fieldy/actions";
import { FieldChangeListener, FieldState, FieldValueChangeListener, FieldValuesChangeListener, FormChangeListener, FormState, FormValue, FormValuesChangeListener, IAction, IFieldSchema, IFieldyEngine, IFormProps, Listener, Unsubscribe } from "fieldy/interfaces";
import { reduce, State } from "fieldy/reducers";

var idSeed = 0

function makeId() {
  idSeed = idSeed + 1;

  return "form-" + idSeed
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
    const payload: SetFieldValuePayload = {
      formName,
      path: fieldPath,
      value
    }
    this.dispatch(
      {
        type: SET_FIELD_VALUE,
        payload: payload,
      }
    )
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

  getFieldValue(formName: string, fieldPath: string) {
    const state = this.store.getState()
    const fieldState = state.forms[formName]?.fields?.[fieldPath]
    if (fieldState) {
      if (fieldState.fieldSchema?.type === "normal") {
        return fieldState.value
      } else if (fieldState.fieldSchema?.type === "object") {
        throw new Error("Not implement object type")
      } else if (fieldState.fieldSchema?.type === "array") {
        throw new Error("Not implement arrray type")
      }
    }
    return undefined
  }

  subscribeToFormChange(name: string, listener: FormChangeListener): Unsubscribe {
    throw new Error("Method not implemented.");
  }

  subscribeToFieldChange(formName: string, path: string, listener: FieldChangeListener): Unsubscribe {
    invariant(typeof listener === 'function', 'listener must be a function.')

    let previousState = this.store.getState().forms[formName]?.fields[path]
    const handleChange = () => {
      const nextState = this.store.getState().forms[formName]?.fields[path]
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeToFieldValueChange(formName: string, fieldPath: string, listener: FieldValueChangeListener): Unsubscribe {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousValue: any = this.store.getState().forms[formName]?.fields?.[fieldPath]?.value

    const handleChange = () => {
      const nextValue = this.store.getState().forms[formName]?.fields?.[fieldPath]?.value
      if (nextValue === previousValue) {
        return
      }
      const prevValue = previousValue
      previousValue = nextValue
      listener(nextValue, prevValue)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeToMultiFieldValueChange(formName: string, fields: string[], listener: FieldValuesChangeListener): Unsubscribe {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousValues: any[] = []
    let previousFormState = this.store.getState().forms[formName]


    for (const fieldName of fields) {
      previousValues.push(previousFormState?.fields[fieldName]?.value)
    }

    const handleChange = () => {
      const nextFormState = this.store.getState().forms[formName]
      if (nextFormState === previousFormState) {
        return
      }
      const nextValues = []
      let changed = false
      for (const fieldName of fields) {
        nextValues.push(nextFormState?.fields[fieldName]?.value)
      }
      for (let i = 0; i < nextValues.length; i++) {
        if (nextValues[i] !== previousValues[i]) {
          changed = true
          break
        }
      }
      if (!changed) {
        return
      }
      const prevValues = previousValues
      previousFormState = nextFormState
      previousValues = nextValues
      listener(nextValues, prevValues)
    }

    return this.store.subscribe(handleChange)
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
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
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
    if (!fieldSchema.name || fieldSchema.virtual) {
      continue
    }
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