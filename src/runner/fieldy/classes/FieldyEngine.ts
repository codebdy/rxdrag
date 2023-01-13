import { configureStore, Store } from "@reduxjs/toolkit";
import { invariant } from "core/utils/util-invariant";
import { CREATE_FORM, FormActionPlayload, REMOVE_FORM, SetFieldValuePayload, SetFormFieldsPayload, SetFormValuesPayload, SET_FIELD_VALUE, SET_FORM_FIELDS, SET_FORM_FLAT_VALUES, SET_FORM_INITIAL_VALUES, SET_FORM_VALUES, SET_MULTI_FIELD_VALUES } from "runner/fieldy/actions";
import { FieldChangeListener, FieldState, FieldValueChangeListener, FieldValuesChangeListener, FormChangeListener, FormState, FormValue, FormValuesChangeListener, IAction, IFieldMetas, IFieldyEngine, IFormProps, Listener, Unsubscribe } from "runner/fieldy/interfaces";
import { reduce, State } from "runner/fieldy/reducers";
import { getChildFields } from "../funcs/path";

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

  setFormFieldMetas(name: string, fieldSchemas: IFieldMetas): void {
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

  addFieldMetas(name: string, fieldMetas: IFieldMetas): void {
    throw new Error("Method not implemented.");
  }
  removeFieldMetas(formName: string, ...fieldPaths: string[]): void {
    throw new Error("Method not implemented.");
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
      console.log("哈哈哈 subscribeToFormValuesChange", this.store.getState().forms[name])
      for (const key of Object.keys(nextState?.fields || {})) {
        if (previousState?.fields[key]?.value !== nextState?.fields[key]?.value) {
          changed = true
        }
      }
      const normalValues = this.getFormNormalValues(name)
      const flatValues = this.getFormFlatValues(name)
      previousState = nextState
      if (changed) {
        listener(normalValues, flatValues)
      }
    }

    return this.store.subscribe(handleChange)
  }

  setFieldValue(formName: string, fieldPath: string, value: any): void {
    console.log("哈哈哈 setFieldValue1", fieldPath, value)
    if (this.getField(formName, fieldPath)?.fieldMeta.type === "object") {
      const values: any = {}
      console.log("哈哈哈 setFieldValue", fieldPath, value, this.getValue(formName, fieldPath, value, values))
      this.getValue(formName, fieldPath, value, values)
      const payload: SetFormValuesPayload = {
        formName,
        values
      }

      this.dispatch(
        {
          type: SET_MULTI_FIELD_VALUES,
          payload: payload,
        }
      )
    } else {
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
  }

  //递归找出改变的字段
  private getValue(formName: string, fieldPath: string, value: any, allValues: any) {
    allValues[fieldPath] = value
    for (const key of Object.keys(value || {})) {
      const subName = key.substring(fieldPath.length + 1)
      if (subName) {
        this.getValue(formName, fieldPath + "." + key, value?.[key], allValues)
      }
    }
  }

  setFieldFragmentValue(formName: string, fieldPath: string, value: any): void {
    const oldValue = this.getFieldValue(formName, fieldPath)
    this.setFieldValue(formName, fieldPath, oldValue ? { ...oldValue, ...value } : value)
  }


  getFormValues(formName: string): FormValue {
    return this.getFormNormalValues(formName)
  }

  getField(formName: string, fieldPath: string): FieldState | undefined {
    const state = this.store.getState()
    return state.forms[formName]?.fields?.[fieldPath]
  }

  getFieldValue(formName: string, fieldPath: string) {
    const state = this.store.getState()
    const fieldState = state.forms[formName]?.fields?.[fieldPath]
    if (fieldState) {
      if (fieldState.fieldMeta?.type === "object") {
        const value = { ...fieldState.value }
        const fields = this.getSubFields(formName, fieldPath)
        for (const key of fields) {
          const subValue = this.getFieldValue(formName, key)
          if (subValue !== undefined) {
            const subName = key.substring(fieldPath.length + 1)
            value[subName] = subValue
          }
        }
        if (Object.keys(value).length) {
          return value
        }
        return undefined
      } else if (fieldState.fieldMeta?.type === "array") {
        throw new Error("Not implement arrray type")
      } else {//undefined or "normal"
        return fieldState.value
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

  public getSubFields(formName: string, path: string) {
    const fieldPaths: string[] = []
    const fields = this.store.getState().forms[formName]?.fields
    for (const key of Object.keys(fields || {})) {
      if (key.startsWith(path)) {
        const name = key.substring(path.length + 1)
        if (name && name.indexOf(".") === -1) {
          fieldPaths.push(key)
        }
      }
    }
    return fieldPaths
  }

  getFormNormalValues(name: string) {
    const formState = this.store.getState().forms[name]
    if (!formState) {
      return {}
    }
    const flatValues = this.getFormFlatValues(name)
    const normalValue = this.trasformFlatValuesToNormal(JSON.parse(JSON.stringify(formState.originalValue || {})), flatValues, formState.fieldMetas)
    return normalValue
  }

  getFormFlatValues(name: string) {
    const formState = this.store.getState().forms[name]
    if (!formState) {
      return {}
    }
    const flatValues: FormValue = {}
    for (const key of Object.keys(formState?.fields || {})) {
      flatValues[key] = formState?.fields[key]?.value
    }

    return flatValues
  }

  private trasformFlatValuesToNormal(originalValue: any = {}, flatValues: FormValue, fieldSchemas: IFieldMetas, basePath?: string) {
    const value: FormValue = originalValue
    const prefix = basePath ? basePath + "." : ""
    const childFields = getChildFields(fieldSchemas, basePath)
    for (const fieldMeta of childFields) {
      if (fieldMeta.type === "fragment") {
        for (const fragField of fieldMeta.fragmentFields || []) {
          if (fragField.name) {
            const fieldPath = prefix + fragField.name
            const subValue = flatValues[fieldPath]
            if (subValue !== undefined) {
              value[fragField.name] = subValue
            }
          } else {
            console.error("No subfield name on fragment")
          }
        }
        continue
      }

      if (!fieldMeta.name || fieldMeta.virtual) {
        continue
      }

      const fieldPath = prefix + fieldMeta.name
      if (fieldMeta.type === "object") {
        value[fieldMeta.name] = this.trasformFlatValuesToNormal(value[fieldMeta.name], flatValues, fieldSchemas, fieldPath)
      } else if (fieldMeta.type === "array") {
        const objectValue = this.trasformFlatValuesToNormal(value[fieldMeta.name], flatValues, fieldSchemas, fieldPath)
        const arrayValue = []
        for (const key of Object.keys(objectValue)) {
          arrayValue[parseInt(key)] = objectValue[key]
        }
        value[fieldMeta.name] = arrayValue
      } else {
        const subValue = flatValues[fieldPath]
        if (subValue !== undefined) {
          value[fieldMeta.name] = flatValues[fieldPath]
        }
      }
    }
    return value
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

