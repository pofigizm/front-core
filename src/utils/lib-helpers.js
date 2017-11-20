export const isPlainObject = value =>
  value && typeof value === 'object' && value.constructor === Object

export const deepAssign = (target, ...sources) => {
  if (target === undefined || target === null) {
    throw new TypeError('Not expected undefined or null in first argument')
  }

  const result = Object(target)

  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (isPlainObject(sourceValue)) {
        result[key] = deepAssign(isPlainObject(targetValue) ? targetValue : {}, sourceValue)
      } else {
        result[key] = sourceValue
      }
    })
  })

  return result
}

export const omit = (keys) => {
  if (!Array.isArray(keys) || !keys.length) {
    return x => x
  }

  return object => Object.keys(object).reduce((acc, key) => {
    if (keys.indexOf(key) === -1) {
      return {
        ...acc,
        [key]: object[key],
      }
    }

    return acc
  }, {})
}

export const listToHash = (list, keyName, getValue = x => x) => {
  if (!list || !keyName) {
    return {}
  }

  return list.reduce((acc, item) => {
    const keyValue = item[keyName]

    if (keyValue) {
      return {
        ...acc,
        [keyValue]: getValue(item),
      }
    }

    return acc
  }, {})
}
