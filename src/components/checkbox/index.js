import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'
import { FormControl, FormControlLabel } from 'material-ui/Form'
import OriginCheckbox from 'material-ui/Checkbox'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = () => ({
  root: {
  },
})

class Checkbox extends PureComponent {
  render() {
    const {
      classes,
      className,
      label = '',
      title,
      color = 'primary',
      value,
      readOnly,
    } = this.props
    debug('render', this.props)

    const indeterminate = typeof value === 'undefined'

    return (
      <FormControl className={cn(className, classes.root)} fullWidth >
        <FormControlLabel
          label={label}
          title={title}
          control={
            <OriginCheckbox
              checked={Boolean(value)}
              color={color}
              disabled={readOnly}
              indeterminate={indeterminate}
              onChange={this.handleChange}
            />
          }
        />
      </FormControl>
    )
  }

  handleChange = (event) => {
    const { value, withIndeterminate, onChange } = this.props
    const { checked } = event.target
    const indeterminate = typeof value === 'undefined'

    const next = withIndeterminate && !indeterminate && !value && checked ? undefined : checked
    if (onChange) {
      onChange(next)
    }
  }
}

const WrappedCheckbox = withStyles(styles, { name: 'fcCheckbox' })(Checkbox)

WrappedCheckbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.bool,
  withIndeterminate: PropTypes.bool,
  onChange: PropTypes.func,
}

export default WrappedCheckbox
