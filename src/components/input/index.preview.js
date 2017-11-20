/* eslint-disable max-len */
export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'only label',
    label: 'input',
  }),

  () => ({
    _preview: 'with text',
    label: 'input',
    value: 'Lorem ipsum',
  }),

  () => ({
    _preview: 'with long text',
    label: 'input',
    value: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
  }),

  ({ action }) => ({
    _preview: 'with handlers',
    label: 'input',
    value: 'Lorem ipsum',
    onChange: action('onChange'),
  }),

  ({ action }) => ({
    _preview: 'read only',
    label: 'input',
    value: 'Lorem ipsum',
    readOnly: true,
    onChange: action('onChange'),
  }),
]
