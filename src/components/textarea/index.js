import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
  },
  readOnly: {
    '& textarea': {
      color: theme.palette.input.inputText,
    },
  },
})

// TODO: replace with https://github.com/callemall/material-ui/issues/8298
class TextArea extends PureComponent {
  render() {
    const {
      classes,
      className,
      value = '',
      readOnly,
      multiline, // eslint-disable-line
      fullWidth, // eslint-disable-line
      ...props
    } = this.props
    debug('render', this.props)

    return (
      <TextField
        className={cn(className, classes.root)}
        InputProps={{
          className: cn(readOnly && classes.readOnly),
        }}
        {...props}
        value={value}
        multiline
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

const WrappedTextArea = withStyles(styles, { name: 'fcTextArea' })(TextArea)

const {
  multiline, // eslint-disable-line
  fullWidth, // eslint-disable-line
  ...origin
} = TextField.propTypes

WrappedTextArea.propTypes = {
  ...origin,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
}

export default WrappedTextArea
