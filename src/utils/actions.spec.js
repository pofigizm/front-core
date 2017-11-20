import core, { onRequestSort, onChangeQuery } from './actions'

test('core', () => {
  expect(core(
    ['ADD', 'DEL'],
    'user/project/module',
  )).toEqual({
    ADD: 'user-project-module-ADD',
    DEL: 'user-project-module-DEL',
  })
})

const dispatch = jest.fn()
const getLocation = query => () => ({
  location: {
    type: 'page',
    payload: { key: 123 },
    query,
  },
})

describe('onRequestSort', () => {
  test('without query', () => {
    onRequestSort('field')(dispatch, getLocation())
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'page',
      payload: {
        key: 123,
      },
      query: {
        q: {
          orderBy: 'field',
          orderDirection: 'desc',
        },
      },
    })
  })

  test('with query', () => {
    const q = { orderBy: 'field', orderDirection: 'desc' }
    onRequestSort('field')(dispatch, getLocation({ q }))
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'page',
      payload: {
        key: 123,
      },
      query: {
        q: {
          orderBy: 'field',
          orderDirection: 'asc',
        },
      },
    })
  })
})

describe('onChangeQuery', () => {
  test('set', () => {
    onChangeQuery('filter', { search: 'word' })(dispatch, getLocation())
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'page',
      payload: {
        key: 123,
      },
      query: {
        q: {
          filter: {
            search: 'word',
          },
        },
      },
    })
  })

  test('clean', () => {
    const q = { filter: 'word' }
    onChangeQuery('filter', { search: undefined })(dispatch, getLocation({ q }))
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'page',
      payload: {
        key: 123,
      },
      query: {
        q: {
          filter: {
            search: undefined,
          },
        },
      },
    })
  })
})
