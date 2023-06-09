import { FormValue, FieldsState } from "../../../interfaces";

export function mergeDefaultValueToValue(defaultValue: FormValue | undefined, value: FormValue | undefined, fields: FieldsState): FormValue | undefined {
  if (value === undefined) {
    return defaultValue
  }
  let newValue: FormValue | undefined = value;
  for (const fieldPath of Object.keys(fields)) {
    const fieldValue = getValueByPath(newValue, fieldPath)
    const fieldDefaultValue = getValueByPath(defaultValue, fieldPath)
    if (fieldValue === undefined && fieldDefaultValue !== undefined) {
      newValue = setValueByPath(newValue, fieldPath, fieldDefaultValue)
    }
  }

  return newValue
}

export function getValueByPath(formValue: FormValue | undefined, path: string): unknown {
  const pathArray = path.split(".")
  let parentValue: FormValue | undefined = formValue
  let currentValue = undefined;
  for (const fieldName of pathArray) {
    if (parentValue === undefined) {
      return undefined
    }
    currentValue = parentValue?.[fieldName]
    parentValue = currentValue as FormValue | undefined
  }
  return currentValue
}

export function setValueByPath(formValue: FormValue | undefined, path: string, fieldValue: unknown): FormValue | undefined {
  if (!path) {
    return formValue;
  }
  const pathArray = path.split(".")
  const [fieldName, ...other] = pathArray;

  let newValue: FormValue | undefined;
  if (formValue === undefined) {
    newValue = {}
  } else {
    newValue = formValue
  }
  const value = other.length > 0 ? fieldValue : setValueByPath(newValue?.[fieldName] as FormValue | undefined, other.join("."), fieldValue)
  newValue = { ...newValue, fieldName: value }
  return newValue
}

export function removeValueByPath(formValue: FormValue | undefined, path: string | undefined): FormValue | undefined {
  if (!path) {
    return formValue
  }
  const pathArray = path.split(".")
  const [fieldName, ...other] = pathArray;

  if (formValue === undefined) {
    return formValue
  } else {
    let newValue = {
      ...formValue
    }
    const value = other.length > 0 ? undefined : removeValueByPath(newValue?.[fieldName] as FormValue | undefined, other.join("."))
    newValue = { ...newValue, fieldName: value }
    if (other.length === 0) {
      delete newValue[fieldName]
    }

    return newValue
  }
}