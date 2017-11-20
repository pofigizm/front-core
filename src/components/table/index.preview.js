const columns = [
  { id: 'key', label: 'Key' },
  { id: 'title', label: 'Title' },
]

const rows = [
  { id: 0, key: 'key-0', title: 'one' },
  { id: 1, key: 'key-1', title: 'two' },
  { id: 2, key: 'key-2', title: 'three' },
]

export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'with text and type',
    columns,
    rows,
  }),

  () => ({
    _preview: 'with text and type',
    columns,
    rows,
    orderBy: 'title',
    orderDirection: 'desc',
  }),
]
