import React, { PureComponent } from 'react'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import OriginPaper from '@material-ui/core/Paper'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = () => ({
  root: {
  },
})

class Paper extends PureComponent {
  render() {
    const {
      className, classes, children, elevation = 4, ...props
    } = this.props
    debug('render', this.props)

    return (
      <OriginPaper className={cn(className, classes.root)} elevation={elevation} {...props}>
        { children }
      </OriginPaper>
    )
  }
}

const WrappedPaper = withStyles(styles, { name: 'fcPaper' })(Paper)

WrappedPaper.propTypes = {
  ...OriginPaper.propTypes,
}

export default WrappedPaper
