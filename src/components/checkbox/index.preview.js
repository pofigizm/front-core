export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'only label',
    label: 'checkbox',
  }),

  () => ({
    _preview: 'very long label',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
