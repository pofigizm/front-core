import { isPlainObject, deepAssign, omit, listToHash } from './lib-helpers'

describe('isPlainObject', () => {
  test('should detect is it plain object or not', () => {
    expect(isPlainObject('some')).toBeFalsy()
    expect(isPlainObject(10)).toBeFalsy()
    expect(isPlainObject(null)).toBeFalsy()
    expect(isPlainObject(undefined)).toBeFalsy()
    expect(isPlainObject(new Date())).toBeFalsy()
    expect(isPlainObject([])).toBeFalsy()
    expect(isPlainObject({})).toBeTruthy()
  })
})

describe('deepAssign', () => {
  test('on first level should work like Object.assign()', () => {
    const target = {
      key1: 'target1',
      key2: 'target2',
      key3: 'target3',
      key4: 'target4',
      key5: 'target5',
    }
    const source1 = {
      key1: null,
      key2: 'source12',
      key5: 'source15',
    }
    const source2 = {
      key3: 'source23',
      key5: 'source25',
    }
    const output = {
      key1: null,
      key2: 'source12',
      key3: 'source23',
      key4: 'target4',
      key5: 'source25',
    }

    const testObject1 = Object.assign(target)

    expect(deepAssign(testObject1, source1, source2))
      .toBe(Object.assign(testObject1, source1, source2))
    expect(deepAssign(target, source1, source2)).toEqual(output)
  })

  test('should copy difficult object in deep levels like a Object.assign() on first level', () => {
    const target = {
      key1: 'target1',
      key2: {
        key21: 'target21',
        key22: {
          key221: 'target221',
          key222: 'target222',
          key223: 'target223',
          key224: 'target224',
        },
        key23: 'target23',
      },
    }
    const source1 = {
      key2: {
        key21: 'source121',
        key22: {
          key221: 'source1221',
          key222: 'source1222',
        },
      },
    }
    const source2 = {
      key2: {
        key22: {
          key222: 'source2222',
          key223: 'source2223',
        },
      },
    }
    const output = {
      key1: 'target1',
      key2: {
        key21: 'source121',
        key22: {
          key221: 'source1221',
          key222: 'source2222',
          key223: 'source2223',
          key224: 'target224',
        },
        key23: 'target23',
      },
    }

    const testObject1 = deepAssign({}, target)

    expect(deepAssign(testObject1, source1, source2)).toEqual(output)
    expect(testObject1.key2.key22)
      .toEqual(Object.assign({}, target.key2.key22, source1.key2.key22, source2.key2.key22))
  })

  test('should work immutable for sources and mutable for target', () => {
    const target = {
      key1: 'target1',
      key2: {
        key21: 'target21',
        key22: {
          key221: 'target221',
          key222: 'target222',
          key223: 'target223',
          key224: 'target224',
        },
        key23: 'target23',
      },
    }
    const source1 = {
      key2: {
        key21: 'source121',
        key22: {
          key221: 'source1221',
          key222: 'source1222',
        },
      },
    }
    const source2 = {
      key2: {
        key22: {
          key222: 'source2222',
          key223: 'source2223',
        },
      },
    }
    const output = {
      key1: 'target1',
      key2: {
        key21: 'source121',
        key22: {
          key221: 'source1221',
          key222: 'source2222',
          key223: 'source2223',
          key224: 'target224',
        },
        key23: 'target23',
      },
    }

    const testSource1 = deepAssign({}, source1)
    const testSource2 = deepAssign({}, source2)
    const testTarget = deepAssign(target, source1, source2)

    expect(testTarget.key2.key22.key221).toBe(output.key2.key22.key221)
    testTarget.key2.key221 = 'some new value'
    expect(testSource1).toEqual(source1)
    testTarget.key2 = 'some new value'
    expect(testSource2).toEqual(source2)
    expect(target.key2).toBe('some new value')
  })
})

describe('omit', () => {
  const testObject = {
    a: 1,
    b: 2,
    c: 3,
  }

  test('should create a copy of a given object without specified keys', () => {
    expect(omit()(testObject)).toEqual(testObject)
    expect(omit([])(testObject)).toEqual(testObject)
    expect(omit(Object.keys(testObject))(testObject)).toEqual({})
    expect(omit(['a', 'c'])(testObject)).toEqual({ b: 2 })
    expect(omit(['b'])(testObject)).toEqual({ a: 1, c: 3 })
    expect(omit(['unknown'])(testObject)).toEqual(testObject)
    expect(omit(['unknown', 'a'])(testObject)).toEqual({ b: 2, c: 3 })
  })
})

describe('listToHash', () => {
  const testList = [
    { id: 1, letter: 'a' },
    { id: 2, letter: 'b' },
    { id: 3, letter: 'c', order: 2 },
  ]
  const getId = object => object.id
  const getLetter = object => object.letter

  test('should return empty object if no list or keyName are presented', () => {
    expect(listToHash()).toEqual({})
    expect(listToHash([])).toEqual({})
    expect(listToHash(testList)).toEqual({})
    expect(listToHash(testList, '')).toEqual({})
  })

  test('should transform list to object according to specified key and value selectors', () => {
    expect(listToHash(testList, 'id')).toEqual({
      1: testList[0],
      2: testList[1],
      3: testList[2],
    })

    expect(listToHash(testList, 'id', getLetter)).toEqual({
      1: 'a',
      2: 'b',
      3: 'c',
    })

    expect(listToHash(testList, 'letter', getId)).toEqual({
      a: 1,
      b: 2,
      c: 3,
    })
  })

  test('should skip objects without requested key', () => {
    expect(listToHash(testList, 'order', getLetter)).toEqual({
      2: 'c',
    })
  })
})
