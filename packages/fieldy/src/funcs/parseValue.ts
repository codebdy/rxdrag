export function parsePathValue(rootValue: any, path?: string) {
  if (!path) {
    return undefined
  }
  const keys = path.split(".")
  let currentValue = rootValue
  for (const key of keys) {
    currentValue = currentValue?.[key]
  }

  return currentValue
}