export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'only label',
    label: 'checkbox',
  }),

  () => ({
    _preview: 'true',
    label: 'checkbox',
    value: true,
  }),

  () => ({
    _preview: 'false',
    label: 'checkbox',
    value: false,
  }),

  ({ action }) => ({
    _preview: 'with handlers',
    label: 'checkbox',
    onChange: action('onChange'),
  }),

  ({ action }) => ({
    _preview: 'read only indeterminate',
    label: 'checkbox',
    onChange: action('onChange'),
    readOnly: true,
  }),

  ({ action }) => ({
    _preview: 'read only true',
    label: 'checkbox',
    value: true,
    onChange: action('onChange'),
    readOnly: true,
  }),

  ({ action }) => ({
    _preview: 'read only false',
    label: 'checkbox',
    value: false,
    onChange: action('onChange'),
    readOnly: true,
  }),
]
