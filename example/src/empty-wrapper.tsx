import * as React from 'react'

interface EmptyWrapper {
  children: any
}

class EmptyWrapper extends React.PureComponent<EmptyWrapper> {
  render() {
    const { children } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}

export default EmptyWrapper
