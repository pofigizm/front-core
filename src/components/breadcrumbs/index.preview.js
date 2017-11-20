import React from 'react'

const Link = ({ text }) => <b>{ text }</b>

export default [
  () => ({
    _preview: 'one text element',
    list: [{
      text: 'First',
    }],
  }),

  () => ({
    _preview: 'default links and text',
    list: [{
      text: 'First',
      to: '/first',
    }, {
      text: 'Second',
    }],
  }),

  () => ({
    _preview: 'solid',
    list: [{
      text: 'First',
      to: '/first',
    }, {
      text: 'Second',
    }],
    solid: true,
  }),

  () => ({
    _preview: 'extended links',
    list: [{
      text: 'First',
      to: '/first',
    }, {
      text: 'Second',
      to: '/second',
    }],
    Link,
  }),
]
