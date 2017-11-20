import React from 'react'

export default [
  ({ action }) => ({
    _preview: 'basic usage',
    userName: 'Ivanov Ivan',
    Logo: <span>Logo</span>,
    onClickDrawerButton: action('onClickDrawerButton'),
    onClickLoginButton: action('onClickLoginButton'),
  }),
]
