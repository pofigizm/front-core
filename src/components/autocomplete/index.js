/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'

import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import Input from 'src/components/input'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.tooltip,
    maxHeight: theme.spacing.unit * 30,
    overflow: 'auto',
  },
  suggestion: {
    display: 'block',
  },
  suggestionContent: {
    fontWeight: theme.typography.fontWeightLight,
  },
  highlight: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
})

class Autocomplete extends PureComponent {
  render() {
    const {
      className,
      classes,
      autoFocus,
      label,
      list = [],
      value = '',
      readOnly,
      open,
    } = this.props
    debug('render', this.props)

    return (
      <form onSubmit={this.handleSubmit} className={cn(classes.root, className)}>
        <Autosuggest
          theme={{
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          alwaysRenderSuggestions={open}
          renderInputComponent={this.renderInput}
          suggestions={list}
          onSuggestionSelected={this.handleSuggestionSelected}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          getSuggestionValue={this.suggestionValue}
          renderSuggestion={this.renderSuggestion}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          inputProps={{
            autoFocus,
            label,
            classes,
            value,
            readOnly,
            onChange: this.handleChange,
          }}
        />
      </form>
    )
  }

  renderInput = ({
    classes,
    id,
    label,
    autoFocus,
    value,
    ref,
    readOnly,
    ...other
  }) => (
    <Input
      autoFocus={autoFocus}
      id={id}
      label={label}
      className={classes.textField}
      value={value}
      inputRef={ref}
      readOnly={readOnly}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  )

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const { classes } = this.props
    const matches = match(suggestion.label, query)
    const parts = parse(suggestion.label, matches)

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          { parts.map((part, index) => (
            <span
              key={index}
              className={cn(classes.suggestionContent, part.highlight && classes.highlight)}
            >
              {part.text}
            </span>
          )) }
        </div>
      </MenuItem>
    )
  }

  renderSuggestionsContainer = ({ containerProps, children }) => (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )

  handleChange = (event, { newValue }) => {
    if (!this.props.onChange) return
    this.props.onChange(newValue)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.props.onSubmit) return
    this.props.onSubmit(event)
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    if (!this.props.onListFetch) return
    this.props.onListFetch(value)
  }

  handleSuggestionsClearRequested = () => {
    if (!this.props.onListClear) return
    this.props.onListClear()
  }

  handleSuggestionSelected = (event, { suggestion }) => {
    if (!this.props.onSelect) return
    this.props.onSelect(suggestion.id)
  }

  shouldRenderSuggestions = () => true

  suggestionValue = suggestion => suggestion.label
}

const WrappedAutocomplete = withStyles(styles, { name: 'fcAutocomplete' })(Autocomplete)

const listSchema = PropTypes.shape({
  id: PropTypes.string.isRequred,
  label: PropTypes.string,
})

WrappedAutocomplete.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.arrayOf(listSchema),
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onListClear: PropTypes.func,
  onListFetch: PropTypes.func,
  onSelect: PropTypes.func,
}

export default WrappedAutocomplete
