import React from 'react'

const children = (<div style={{ padding: 20 }}>Lorem ipsum</div>)

export default [
  () => ({
    _preview: 'base level',
    children,
  }),

  () => ({
    _preview: 'first level',
    elevation: 1,
    children,
  }),
]
