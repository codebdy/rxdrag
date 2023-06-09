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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parentValue: any = formValue
  let currentValue = undefined;
  for (const fieldName of pathArray) {
    if(parentValue === undefined){
      return undefined
    }
    currentValue = parentValue?.[fieldName]
    parentValue = currentValue
  }
  return currentValue
}

export function setValueByPath(formValue: FormValue | undefined, path: string, fieldValue: unknown): FormValue | undefined {
  const pathArray = path.split(".")
  let newFormValue 
  return formValue
}