import React from 'react'

const children = (<div style={{ padding: 15, backgroundColor: 'coral' }}>children component</div>)

export default [
  () => ({
    _preview: 'basic usage',
    title: 'Lorem ipsum',
    breadcrumbs: [{
      name: 'First',
      link: '/first',
    }, {
      name: 'Second',
    }],
    children,
  }),
]
