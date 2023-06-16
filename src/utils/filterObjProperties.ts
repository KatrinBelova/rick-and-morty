export function filterProperties<T extends Record<string, unknown>>(
  obj: T,
  propertyNames: (keyof T)[]
) {
  return propertyNames.map((propertyName) => obj[propertyName]).filter(Boolean);
}
