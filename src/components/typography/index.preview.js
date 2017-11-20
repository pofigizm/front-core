import React from 'react'

const children = (
  <span
    style={{
      display: 'block',
      padding: 15,
      backgroundColor: 'coral',
    }}
  >
    children component
  </span>
)

export default [
  () => ({
    _preview: 'with text',
    children: 'Lorem ipsum',
  }),

  () => ({
    _preview: 'with text and type',
    type: 'title',
    children: 'Lorem ipsum',
  }),

  () => ({
    _preview: 'with conponent',
    children,
  }),
]
