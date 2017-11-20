const options = [{
  id: 0,
  label: 'options1',
}, {
  id: 1,
  label: 'options2',
}, {
  id: 2,
  label: 'options3',
}]

export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'only label',
    label: 'select',
  }),

  () => ({
    _preview: 'with options',
    label: 'select',
    options,
  }),

  () => ({
    _preview: 'with value',
    label: 'select',
    value: 0,
    options,
  }),

  ({ action }) => ({
    _preview: 'with handlers',
    label: 'select',
    options,
    value: 0,
    onChange: action('onChange'),
  }),

  ({ action }) => ({
    _preview: 'read only',
    label: 'select',
    options,
    value: 0,
    onChange: action('onChange'),
    readOnly: true,
  }),
]
