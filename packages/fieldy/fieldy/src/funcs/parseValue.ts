// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePathValue(rootValue: any, path?: string) {
  if (!path) {
    return rootValue
  }
  const keys = path.split(".")
  let currentValue = rootValue
  for (const key of keys) {
    currentValue = currentValue?.[key]
  }

  return currentValue
}