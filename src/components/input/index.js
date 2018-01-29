import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
  },
  input: {
    '& > input': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  readOnly: {
    '& > input': {
      color: theme.palette.text.primary,
    },
  },
})

class Input extends PureComponent {
  render() {
    const {
      classes,
      className,
      value = '',
      readOnly,
      multiline, // eslint-disable-line
      fullWidth, // eslint-disable-line
      rows, // eslint-disable-line
      ...props
    } = this.props
    debug('render', this.props)

    return (
      <TextField
        className={cn(className, classes.root)}
        InputProps={{
          className: cn(classes.input, readOnly && classes.readOnly),
        }}
        {...props}
        value={value}
        fullWidth
        disabled={readOnly}
        onChange={this.handleChange}
      />
    )
  }

  handleChange = (event) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(event.target.value)
    }
  }
}

const WrappedInput = withStyles(styles, { name: 'fcInput' })(Input)

const {
  multiline, // eslint-disable-line
  fullWidth, // eslint-disable-line
  rows, // eslint-disable-line
  ...origin
} = TextField.propTypes

WrappedInput.propTypes = {
  ...origin,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
}

export default WrappedInput
