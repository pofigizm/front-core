import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import Autocomplete from 'src/components/autocomplete'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
  },
  formControl: {
    display: 'flex',
    flexWrap: 'wrap',

    'label + &': {
      marginTop: theme.spacing.unit * 2,
    },
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  input: {
    flexGrow: 1,
    marginTop: theme.spacing.unit,
  },
  readOnly: {
    color: theme.palette.text.primary,
  },
})

class Tags extends PureComponent {
  constructor(props) {
    super(props)
    this.hash = `_${Math.random().toString(36).substring(7)}`
  }

  render() {
    const {
      classes,
      className,
      label,
      title,
      list = [],
      readOnly,
      selected = [],
      value = '',

      onChange,
      onBlur,
      onSubmit,
      onListClear,
      onListFetch,
      onSelect,
    } = this.props
    debug('render', this.props)

    const labelShrink = Boolean(selected.length || (!readOnly && value.length)) || undefined
    const safeDelete = readOnly ? Function.prototype : this.handleDelete

    return (
      <FormControl className={cn(className, classes.root)} fullWidth >
        <InputLabel
          shrink={labelShrink}
          htmlFor={this.hash}
        >
          { label }
        </InputLabel>
        <div className={cn(classes.formControl)}>
          { selected.map(({ id, label: lbl }) => (
            <Chip
              key={id}
              className={cn(classes.chip)}
              label={lbl}
              onDelete={safeDelete(id)}
            />
          )) }
          <Autocomplete
            className={cn(classes.input)}
            title={title}
            id={this.hash}
            value={readOnly ? '' : value}
            list={list}
            readOnly={readOnly}
            onChange={onChange}
            onBlur={onBlur}
            onSubmit={onSubmit}
            onListClear={onListClear}
            onListFetch={onListFetch}
            onSelect={onSelect}
          />
        </div>
      </FormControl>
    )
  }

  handleDelete = (id) => {
    const { onDelete } = this.props

    if (!this.props.onDelete) {
      return undefined
    }

    return () => {
      onDelete(id)
    }
  }
}

const WrappedTags = withStyles(styles, { name: 'fcTags' })(Tags)

const listSchema = PropTypes.shape({
  id: PropTypes.string.isRequred,
  label: PropTypes.string,
})

WrappedTags.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.arrayOf(listSchema),
  readOnly: PropTypes.bool,
  selected: PropTypes.arrayOf(listSchema),
  value: PropTypes.string,

  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onListClear: PropTypes.func,
  onListFetch: PropTypes.func,
  onSelect: PropTypes.func,
}

export default WrappedTags
