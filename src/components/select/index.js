import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import OriginSelect from '@material-ui/core/Select'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
  },
  readOnly: {
    color: theme.palette.text.primary,
  },
})

class Select extends PureComponent {
  constructor(props) {
    super(props)
    this.hash = `_${Math.random().toString(36).substring(7)}`
  }

  render() {
    const {
      classes,
      className,
      label,
      value = '',
      options = [],
      readOnly,
    } = this.props
    debug('render', this.props)

    return (
      <FormControl className={cn(className, classes.root)} fullWidth >
        <InputLabel
          htmlFor={this.hash}
        >
          { label }
        </InputLabel>
        <OriginSelect
          value={value}
          disabled={readOnly}
          onChange={this.handleChange}
          input={<Input className={cn(readOnly && classes.readOnly)} id={this.hash} />}
        >
          { options.map(option => (
            <MenuItem key={String(option.id)} value={option.id}>
              { option.label }
            </MenuItem>
          )) }
        </OriginSelect>
      </FormControl>
    )
  }

  handleChange = (event) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(event.target.value)
    }
  }
}

const WrappedSelect = withStyles(styles, { name: 'fcSelect' })(Select)

const optionsSchema = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequred,
  label: PropTypes.string,
})

WrappedSelect.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(optionsSchema),
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
}

export default WrappedSelect
