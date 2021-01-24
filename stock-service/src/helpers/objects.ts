import { camelCase } from 'change-case'

export function transformObjectKeysToCamel<T = object>(obj: T): T {
  const objectTransformed: T = {} as T

  Object.keys(obj).forEach((key) => {
    objectTransformed[camelCase(key)] = obj[key]
  })

  return objectTransformed
}
