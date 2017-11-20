/* eslint-disable max-len */
export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'only label',
    label: 'textarea',
  }),

  () => ({
    _preview: 'with text',
    label: 'textarea',
    value: 'Lorem ipsum',
  }),

  () => ({
    _preview: 'with long text',
    label: 'textarea',
    value: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
  }),

  () => ({
    _preview: 'with long text and rows',
    label: 'textarea',
    value: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    rows: 2,
  }),

  ({ action }) => ({
    _preview: 'with handlers',
    label: 'textarea',
    value: 'Lorem ipsum',
    onChange: action('onChange'),
  }),

  ({ action }) => ({
    _preview: 'read only',
    label: 'textarea',
    value: 'Lorem ipsum',
    readOnly: true,
    onChange: action('onChange'),
  }),
]
