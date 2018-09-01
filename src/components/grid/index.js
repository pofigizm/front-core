import React, { PureComponent } from 'react'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import OriginGrid from '@material-ui/core/Grid'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = () => ({
  root: {
  },
})

class Grid extends PureComponent {
  render() {
    const {
      className, classes, children, ...props
    } = this.props
    debug('render', this.props)

    return (
      <OriginGrid className={cn(className, classes.root)} {...props}>
        { children }
      </OriginGrid>
    )
  }
}

const WrappedGrid = withStyles(styles, { name: 'fcGrid' })(Grid)

WrappedGrid.propTypes = {
  ...OriginGrid.propTypes,
}

export default WrappedGrid
