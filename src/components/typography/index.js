import React, { PureComponent } from 'react'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'
import OriginTypography from 'material-ui/Typography'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = () => ({
  root: {
  },
})

class Typography extends PureComponent {
  render() {
    const {
      className, classes, children, type = 'body1', ...props
    } = this.props
    debug('render', this.props)

    return (
      <OriginTypography
        className={cn(className, classes.root)}
        type={type}
        {...props}
      >
        { children }
      </OriginTypography>
    )
  }
}

const WrappedTypography = withStyles(styles, { name: 'fcTypography' })(Typography)

WrappedTypography.propTypes = {
  ...OriginTypography.propTypes,
}

export default WrappedTypography
