/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormValue, FormState, FieldState } from "../../../interfaces/fieldy";

export class FormHelper {
  constructor(private formState: FormState) { }

  mergeDefaultValueToValue(defaultValue: FormValue | undefined): FormValue | undefined {
    const value = this.formState.value
    if (value === undefined) {
      return defaultValue
    }
    let newValue: FormValue | undefined = value;
    for (const fieldPath of Object.keys(this.formState.fields)) {
      const fieldValue = this.doGetValueByPath(newValue, fieldPath)
      const fieldDefaultValue = this.doGetValueByPath(defaultValue, fieldPath)
      if (fieldValue === undefined && fieldDefaultValue !== undefined) {
        newValue = this.setValueByPath(fieldPath, fieldDefaultValue)
      }
    }
    return newValue
  }

  getValueByPath(path: string): unknown {
    return this.doGetValueByPath(this.formState.value, path);
  }

  // getDefaultValueByPath(path: string): unknown {
  //   return this.doGetValueByPath(this.formState.defaultValue, path);
  // }

  getInitialValueByPath(path: string): unknown {
    return this.doGetValueByPath(this.formState.initialValue, path);
  }

  doGetValueByPath(formValue: FormValue | undefined, path: string): unknown {
    const fields = this.getPathFields(path)
    if (fields.length == 0) {
      return undefined
    }

    let currentValue: any = formValue;
    let parentField: FieldState | undefined = undefined
    for (const field of fields) {

      const fieldValue = parentField?.meta.type === "array" ? currentValue?.[field.name as number] : currentValue?.[field.name as string]

      currentValue = fieldValue
      parentField = field
    }

    return currentValue
  }

  setValueByPath(path: string, fieldValue: unknown): FormValue | undefined {
    return this.doSetValueByPath(this.formState.value, path, fieldValue);
  }

  doSetValueByPath(parentValue: FormValue | undefined, path: string, fieldValue: unknown, parentField?: FieldState): FormValue | undefined {
    if (!path) {
      return parentValue;
    }
    const pathArray = path.split(".")
    const [fieldName, ...other] = pathArray;
    //const parentPath = pathArray.length > 1 ? pathArray.slice(0, pathArray.length - 2).join(".") : undefined
    //const parentField = parentPath ? this.formState.fields[parentPath] : undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newParentValue: any;
    if (parentValue === undefined) {
      newParentValue = parentField?.meta?.type === "array" ? [] : {}
    } else {
      newParentValue = parentValue
    }
    const oldValue = newParentValue?.[parentField?.meta?.type === "array" ? parseInt(fieldName) : fieldName]
    const value = other.length === 0 ? fieldValue : this.doSetValueByPath(oldValue, other.join("."), fieldValue, this.formState.fields[parentField?.path ? parentField?.path + "." + fieldName : fieldName])
    if (parentField?.meta?.type === "array") {
      newParentValue = [...newParentValue];
      (newParentValue as unknown[]).splice(parseInt(fieldName), 1, value)
    } else {
      newParentValue = { ...newParentValue }
      newParentValue[fieldName] = value
    }
    return newParentValue
  }

  removeValueByPath(path: string | undefined): FormValue | undefined {
    const value = this.doRemoveValueByPath(this.formState.value, path);
    return value
  }

  doRemoveValueByPath(parentValue: any | undefined, path: string | undefined, parentField?:FieldState): FormValue | undefined {
    if (!path) {
      return parentValue
    }
    const pathArray = path.split(".")
    const [fieldName, ...other] = pathArray;
    //const parentPath = pathArray.length > 1 ? pathArray.slice(0, pathArray.length - 2).join(".") : undefined
    //const parentField = parentPath ? this.formState.fields[parentPath] : undefined
    if (parentValue === undefined) {
      return parentValue
    } else {
      let newParentValue = parentField?.meta?.type === "array" ? [...parentValue] : { ...parentValue }
      const oldValue = newParentValue?.[parentField?.meta?.type === "array" ? parseInt(fieldName) : fieldName]
      const value = other.length === 0 ? undefined : this.doRemoveValueByPath(oldValue, other.join("."), this.formState.fields[parentField?.path ? parentField?.path + "." + fieldName : fieldName])
      //newParentValue = { ...newParentValue, [fieldName]: value }
      if (other.length === 0) {
        if (parentField?.meta?.type === "array") {
          newParentValue = [...newParentValue];
          (newParentValue as unknown[]).splice(parseInt(fieldName), 1)
        } else {
          newParentValue = { ...newParentValue, [fieldName]: value }
          delete newParentValue[fieldName]
        }

      }

      return newParentValue
    }
  }

  getPathFields(path?: string): FieldState[] {
    if (!path) {
      return []
    }

    const pathArray = path.split(".")
    const fieldPaths: string[] = []
    let parent = ""
    for (const fieldName of pathArray) {
      const fieldPath = parent ? (parent + "." + fieldName) : fieldName
      fieldPaths.push(fieldPath)
      parent = fieldPath
    }
    return fieldPaths.map((fpath) => this.formState.fields[fpath]).filter(field => !!field) as FieldState[]
  }
}

