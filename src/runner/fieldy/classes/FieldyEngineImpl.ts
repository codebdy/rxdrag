import { configureStore, Store } from "@reduxjs/toolkit";
import { invariant } from "core/utils/util-invariant";
import { ADD_FORM_FIELDS, CREATE_FORM, FormActionPlayload, REMOVE_FORM, REMOVE_FORM_FIELDS, SetFieldValuePayload, SetFormValuePayload, SET_FIELD_INITAL_VALUE, SET_FIELD_MODIFY, SET_FIELD_VALUE, SET_FORM_FLAT_VALUE, SET_FORM_INITIAL_VALUE, SET_FORM_VALUE, SET_MULTI_FIELD_VALUES } from "runner/fieldy/actions";
import { FieldChangeListener, FieldsState, FieldState, FieldValueChangeListener, FieldValuesChangeListener, FormChangeListener, FormState, FormValue, FormValueChangeListener, IAction, IFieldSchema, IFieldyEngine, IForm, IFormProps, Listener, Unsubscribe } from "runner/fieldy/interfaces";
import { reduce, State } from "runner/fieldy/reducers";
import { getChildFields } from "../funcs/path";
import { FormImpl } from "./FormImpl";

var idSeed = 0

function makeId() {
  idSeed = idSeed + 1;

  return "form-" + idSeed
}

/**
 * 建议一个应用只创建一个Fieldy实例
 */
export class FieldyEngineImpl implements IFieldyEngine {
  store: Store<State>

  forms: {
    [name: string]: IForm | undefined
  } = {}

  constructor(debugMode?: boolean,) {
    this.store = makeStoreInstance(debugMode || false)
  }

  createForm(options?: IFormProps): IForm {
    const name = makeId()
    this.dispatch({
      type: CREATE_FORM,
      payload: {
        formName: name,
      }
    })

    return new FormImpl(this, name)
  }

  removeForm(name: string): void {
    this.dispatch({
      type: REMOVE_FORM,
      payload: {
        formName: name,
      }
    })
  }

  addFields(formName: string, ...fieldSchemas: IFieldSchema[]): void {
    this.dispatch({
      type: ADD_FORM_FIELDS,
      payload: {
        formName: formName,
        fieldSchemas: fieldSchemas,
      }
    })
  }
  removeFields(formName: string, ...fieldPaths: string[]): void {
    this.dispatch({
      type: REMOVE_FORM_FIELDS,
      payload: {
        formName: formName,
        paths: fieldPaths,
      }
    })
  }

  setFormInitialValue(name: string, value: FormValue): void {
    this.store.dispatch({
      type: SET_FORM_INITIAL_VALUE,
      payload: {
        formName: name,
        value: value,
      }
    })
  }

  setFormValue(name: string, value: FormValue): void {
    this.store.dispatch({
      type: SET_FORM_VALUE,
      payload: {
        formName: name,
        value: value,
      }
    })
  }

  setFormFlatValue(name: string, flatValues: FormValue): void {
    const payload: SetFormValuePayload = {
      formName: name,
      value: flatValues
    }
    this.dispatch(
      {
        type: SET_FORM_FLAT_VALUE,
        payload: payload,
      }
    )
  }

  getForm(name: string): IForm | undefined {
    return this.forms[name]
  }

  getFormState(name: string): FormState | undefined {
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

  subscribeToFormValuesChange(name: string, listener: FormValueChangeListener): Unsubscribe {
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
      const normalValues = this.getFormNormalValues(name)

      previousState = nextState
      if (changed) {
        listener(normalValues)
      }
    }

    return this.store.subscribe(handleChange)
  }

  setFieldIntialValue(formName: string, fieldPath: string, value: any): void {
    const payload: SetFieldValuePayload = {
      formName,
      path: fieldPath,
      value
    }
    this.dispatch(
      {
        type: SET_FIELD_INITAL_VALUE,
        payload: payload,
      }
    )
  }

  setFieldValue(formName: string, fieldPath: string, value: any): void {
    if (this.getFieldState(formName, fieldPath)?.meta.type === "object") {
      const value: any = {}
      this.getValue(formName, fieldPath, value, value)
      const payload: SetFormValuePayload = {
        formName,
        value: value
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

  inputFieldValue(formName: string, fieldPath: string, value: any): void {
    this.dispatch(
      {
        type: SET_FIELD_MODIFY,
        payload: {
          formName,
          path: fieldPath,
        },
      }
    )
    this.setFieldValue(formName, fieldPath, value)
  }

  //递归找出改变的字段
  private getValue(formName: string, fieldPath: string, value: any, allValues: any) {
    const fields = this.store.getState().forms[formName]?.fields
    if (!fields) {
      return
    }
    allValues[fieldPath] = value
    const subFields = getChildFields(fields, fieldPath)
    for (const field of subFields) {
      if (field.name && Object.keys(value).find(key => key === field.name)) {
        this.getValue(formName, field.path, value?.[field.name], allValues)
      }
    }
  }

  setFieldFragmentValue(formName: string, fieldPath: string, value: any): void {
    const oldValue = this.getFieldValue(formName, fieldPath)
    this.setFieldValue(formName, fieldPath, oldValue ? { ...oldValue, ...value } : value)
  }


  getFormValue(formName: string): FormValue {
    return this.getFormNormalValues(formName)
  }

  getFieldState(formName: string, fieldPath: string): FieldState | undefined {
    const state = this.store.getState()
    return state.forms[formName]?.fields?.[fieldPath]
  }

  getFieldValue(formName: string, fieldPath: string) {
    const state = this.store.getState()
    const fieldState = state.forms[formName]?.fields?.[fieldPath]
    if (fieldState) {
      if (fieldState.meta?.type === "object") {
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
      } else if (fieldState.meta?.type === "array") {
        const value: any[] = []
        const fields = this.getSubFields(formName, fieldPath)
        //子字段不存在，可能没渲染完，直接返回value。因为列表根据初值动态增加字段
        //还有个问题，就是数组长度变化，这种情况要更新数组字段的全部值，后面数组编辑时，要留意数组值的整体更新
        if (fields.length !== fieldState.value?.length) {
          return fieldState.value
        }
        for (const key of fields) {
          const subValue = this.getFieldValue(formName, key)
          if (subValue !== undefined) {
            value.push(subValue)
          }
        }
        if (value.length) {
          return value
        }
        return []
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
    const normalValue = this.trasformFlatValuesToNormal(JSON.parse(JSON.stringify(formState.initialValue || {})), flatValues, formState.fields)
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

  private trasformFlatValuesToNormal(originalValue: any = {}, flatValues: FormValue, allFields: FieldsState, basePath?: string) {
    const value: FormValue = originalValue
    const prefix = basePath ? basePath + "." : ""
    const childFields = getChildFields(allFields, basePath)
    for (const field of childFields) {
      // if (field.type === "fragment") {
      //   for (const fragField of field.fragmentFields || []) {
      //     if (fragField.name) {
      //       const fieldPath = prefix + fragField.name
      //       const subValue = flatValues[fieldPath]
      //       if (subValue !== undefined) {
      //         value[fragField.name] = subValue
      //       }
      //     } else {
      //       console.error("No subfield name on fragment")
      //     }
      //   }
      //   continue
      // }

      if (!field.name) {
        continue
      }

      const fieldPath = prefix + field.name
      if (field.meta.type === "object") {
        value[field.name] = this.trasformFlatValuesToNormal(value[field.name], flatValues, allFields, fieldPath)
      } else if (field.meta.type === "array") {
        const objectValue = this.trasformFlatValuesToNormal(value[field.name], flatValues, allFields, fieldPath)
        const arrayValue = []
        for (const key of Object.keys(objectValue)) {
          arrayValue[parseInt(key)] = objectValue[key]
        }
        value[field.name] = arrayValue
      } else {
        const subValue = flatValues[fieldPath]
        if (subValue !== undefined) {
          value[field.name] = flatValues[fieldPath]
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

