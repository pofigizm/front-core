import {
  parseToken,
  querySerializer,
  compareByKey,
  fuzzySearch,
  fuzzySearchInKeys,
  hashMap,
  matcher,
  filterList,
  findTree,
  makeDeep,
  mergeSkipUndef,
} from './helpers'

test('parseToken', () => {
  expect(parseToken()).toEqual({ error: 'token does not exist' })
  expect(parseToken('123')).toEqual({ error: 'token does not correct' })
  expect(parseToken('123.123').error).toBeDefined()
  expect(parseToken('a.eyJ0ZXN0IjoxMjN9')).toEqual({ data: { test: 123 } })
})

test('querySerializer', () => {
  const query = { q: { a: { b: { c: true } } } }
  const string = querySerializer.stringify(query)
  const nextQuery = querySerializer.parse(string)

  expect(nextQuery).toEqual(query)
  expect(querySerializer.stringify({ v: '123', q: '123' })).toEqual('v=123')
  expect(querySerializer.parse('v=123')).toEqual({ v: '123' })
  expect(querySerializer.parse('v=123&q=123')).toEqual({ v: '123', q: {} })
  expect(querySerializer.extract('http://goo.gl?v=123&q=123')).toBe('v=123&q=123')
})

test('compareByKey', () => {
  const a = { id: 'abc' }
  const b = { id: 'cba' }

  expect(compareByKey('id', 'desc')(a, b)).toBe(-1)
  expect(compareByKey('id', 'asc')(a, b)).toBe(1)
  expect(compareByKey('id')(a, b)).toBe(0)
})

test('fuzzySearch', () => {
  const source = 'aabbcc dd'

  expect(fuzzySearch(undefined, 'abcd')).toBeFalsy()

  expect(fuzzySearch(source)).toBeTruthy()
  expect(fuzzySearch(source, '')).toBeTruthy()

  expect(fuzzySearch(source, 'abcd')).toBeTruthy()
  expect(fuzzySearch(source, 'ABCd')).toBeTruthy()
  expect(fuzzySearch(source, 'dd')).toBeTruthy()
  expect(fuzzySearch(source, 'aabbcc dd')).toBeTruthy()

  expect(fuzzySearch(source, 'ca')).toBeFalsy()
  expect(fuzzySearch(source, 'bdc')).toBeFalsy()
  expect(fuzzySearch(source, 'ee')).toBeFalsy()
})

test('fuzzySearchInKeys', () => {
  const mockTrue = jest.fn(() => true)
  const mockFalse = jest.fn(() => false)
  const obj = { id: 123, name: 'abc' }

  expect(fuzzySearchInKeys()(obj)).toBeTruthy()
  expect(fuzzySearchInKeys([])(obj)).toBeTruthy()
  expect(fuzzySearchInKeys(['id', 'name'], 'def', [obj])(obj)).toBeTruthy()

  expect(fuzzySearchInKeys(undefined, undefined, undefined, mockTrue)(obj)).toBeTruthy()
  expect(fuzzySearchInKeys([], undefined, undefined, mockTrue)(obj)).toBeTruthy()
  expect(fuzzySearchInKeys(['id', 'name'], 'def', [obj], mockTrue)(obj)).toBeTruthy()
  expect(mockTrue).not.toHaveBeenCalled()

  expect(fuzzySearchInKeys(['id', 'name'], undefined, undefined, mockTrue)(obj)).toBeTruthy()
  expect(mockTrue).toHaveBeenCalledTimes(1)

  expect(fuzzySearchInKeys(['id', 'name'], undefined, undefined, mockFalse)(obj)).toBeFalsy()
  expect(mockFalse).toHaveBeenCalledTimes(2)

  fuzzySearchInKeys(['name'], 'def', undefined, mockTrue)(obj)
  expect(mockTrue).toHaveBeenLastCalledWith('abc', 'def')
})

test('hashMap', () => {
  const obj = { a: 1, b: 2 }
  expect(hashMap()).toEqual({})
  expect(hashMap(obj)).toEqual(obj)
  expect(hashMap(obj, v => v + 1)).toEqual({ a: 2, b: 3 })
})

test('matcher', () => {
  expect(matcher('abc')({ label: 'abcd efgh' })).toBeTruthy()
  expect(matcher('abc ')({ label: 'abcd efgh' })).toBeTruthy()
  expect(matcher('abc ef')({ label: 'abcd efgh' })).toBeTruthy()
  expect(matcher('abc ef')({ label: 'Abcd Efgh' })).toBeTruthy()

  expect(matcher('bcd')({ label: 'abcd efgh' })).toBeFalsy()
  expect(matcher('abcde')({ label: 'abcd efgh' })).toBeFalsy()
  expect(matcher('abc f')({ label: 'abcd efgh' })).toBeFalsy()

  expect(matcher('Description')({ label: 'Description' })).toBeTruthy()
  expect(matcher('Объявление')({ label: 'Объявление' })).toBeTruthy()
})

test('filterList', () => {
  const res = arr => arr.map(id => ({ id: Number(id), label: `txt${id}` }))
  const index = {
    0: [0],
    1: [0, 1],
    2: [0, 1, 2],
    3: [0, 1, 3],
    4: [0, 4],
    5: [0, 5],
    6: [6],
    7: [6, 7],
    8: [6, 8],
    9: [6, 9],
  }
  const list = res(Object.keys(index))

  expect(filterList()).toEqual([])
  expect(filterList('txt')).toEqual([])

  expect(filterList('', list)).toEqual(list)
  expect(filterList('txt', list)).toEqual(list)
  expect(filterList('xtx', list)).toEqual([])

  expect(filterList('', list, [0], index)).toEqual(res([6, 7, 8, 9]))
  expect(filterList('txt', list, [0], index)).toEqual(res([6, 7, 8, 9]))
  expect(filterList('txt', list, [1], index)).toEqual(res([4, 5, 6, 7, 8, 9]))
  expect(filterList('txt', list, [2], index)).toEqual(res([3, 4, 5, 6, 7, 8, 9]))
  expect(filterList('txt', list, [2, 6], index)).toEqual(res([3, 4, 5]))
})

test('findTree', () => {
  const index = {
    0: [0],
    1: [0, 1],
    2: [0, 1, 2],
    3: [0, 1, 3],
    4: [0, 4],
    5: [0, 5],
    6: [6],
    7: [6, 7],
    8: [6, 8],
    9: [6, 9],
  }

  expect(findTree()).toBeTruthy()
  expect(findTree([2])).toBeTruthy()

  expect(findTree([2], [1], index)).toBeTruthy()
  expect(findTree([2, 4, 7], [0], index)).toBeTruthy()
  expect(findTree([2, 4, 7], [2], index)).toBeTruthy()
  expect(findTree([2, 4, 7], [2, 7], index)).toBeTruthy()
  expect(findTree([0, 6], [6], index)).toBeTruthy()

  expect(findTree(null, [0], index)).toBeFalsy()
  expect(findTree([], [0], index)).toBeFalsy()
  expect(findTree([0], [1], index)).toBeFalsy()
  expect(findTree([2, 4, 7], [8], index)).toBeFalsy()
  expect(findTree([2, 4, 7], [2, 8], index)).toBeFalsy()
})

test('makeDeep', () => {
  expect(makeDeep()).toEqual({})
  expect(makeDeep('key', 123)).toEqual({ key: 123 })
  expect(makeDeep('key.innerKey', 123)).toEqual({ key: { innerKey: 123 } })
  expect(makeDeep('key.innerKey.deepInnerKey', 123)).toEqual({ key: { innerKey: { deepInnerKey: 123 } } })
})

test('mergeSkipUndef', () => {
  expect(mergeSkipUndef()).toEqual({})
  expect(mergeSkipUndef(false, { a: 1 }, { a: 2 })).toEqual({ a: 1 })
  expect(mergeSkipUndef(true, { a: 1 }, { a: 2 })).toEqual({ a: 2 })
  expect(mergeSkipUndef(true, { a: 1 }, { a: undefined })).toEqual({ a: 1 })
  expect(mergeSkipUndef(true, { a: 1, b: 1 }, { a: 2 })).toEqual({ a: 2, b: 1 })
  expect(mergeSkipUndef(true, { a: 1 }, { b: 1 })).toEqual({ a: 1, b: 1 })

  const converter = {
    b: 'propB',
    c: 'propC.innerProp',
  }
  expect(mergeSkipUndef(true, { a: 1 }, { b: 1 }, converter)).toEqual({ a: 1, propB: 1 })
  expect(mergeSkipUndef(true, { a: 1, b: 2 }, { b: 1 }, converter)).toEqual({ a: 1, b: 2, propB: 1 })
  expect(mergeSkipUndef(true, { a: 1 }, { c: 1 }, converter)).toEqual({ a: 1, propC: { innerProp: 1 } })

  const prev = { a: 1, propC: { innerProp: 99, otherProp: 2 } }
  const next = { a: 1, propC: { innerProp: 1, otherProp: 2 } }
  expect(mergeSkipUndef(true, prev, { c: 1 }, converter)).toEqual(next)
  expect(prev.propC.innerProp).toBe(99) // not changed
})
