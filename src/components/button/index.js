import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'
import OriginButton from 'material-ui/Button'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = () => ({
  root: {
    width: '100%',
  },
})

class Button extends PureComponent {
  render() {
    const {
      classes,
      className,
      label = '',
      readOnly,
      variant = 'raised',
      color = 'primary',
      ...props
    } = this.props
    debug('render', this.props)

    return (
      <OriginButton
        variant={variant}
        color={color}
        className={cn(classes.root, className)}
        disabled={readOnly}
        {...props}
      >
        { label }
      </OriginButton>
    )
  }
}

const WrappedButton = withStyles(styles, { name: 'fcButton' })(Button)

const {
  ...origin
} = OriginButton.propTypes

WrappedButton.propTypes = {
  ...origin,
  readOnly: PropTypes.bool,
}

export default WrappedButton
