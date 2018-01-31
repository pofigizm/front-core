import React, { PureComponent } from 'react'
import match from 'autosuggest-highlight/match'

const list = [{
  id: 0,
  label: 'super suggest1',
}, {
  id: 1,
  label: 'super suggest2',
}, {
  id: 2,
  label: 'super suggest3',
}]

export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'only label',
    label: 'autocomplete',
  }),

  () => ({
    _preview: 'with text',
    label: 'autocomplete',
    value: 'suggest',
  }),

  ({ action }) => ({
    _preview: 'with handlers',
    label: 'autocomplete',
    list,
    onChange: action('onChange'),
  }),

  ({ action }) => ({
    _preview: 'read only',
    label: 'autocomplete',
    value: 'suggest',
    onChange: action('onChange'),
    readOnly: true,
  }),

  () => ({
    _preview: 'with handlers',
    label: 'autocomplete',
    value: 'sup sug',
    list,
    open: true,
  }),

  () => ({
    _preview: 'should be under previous',
    label: 'should be under previous',
    value: 'should be under previous',
  }),
]

export class State extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      list: [],
      selected: null,
    }
  }

  render() {
    const { Target } = this.props

    return (
      <div>
        <Target
          label="state"
          {...this.state}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onSelect={this.handleSelect}
          onListFetch={this.handleListFetch}
          onListClear={this.handleListClear}
        />
        <pre>
          { JSON.stringify(this.state.selected, null, 2) }
        </pre>
      </div>
    )
  }

  handleChange = (value) => {
    this.props.action('onChange')(value)
    this.setState({
      value,
    })
  }

  handleSubmit = () => {
    this.props.action('onSubmit')()
  }

  handleSelect = (id) => {
    this.props.action('onSelect')(id)
    this.setState({
      selected: list.find(el => el.id === id),
      value: '',
    })
  }

  handleListFetch = (value) => {
    this.props.action('onListFetch')(value)
    const parts = value.split(' ').filter(el => el).length
    this.setState({
      list: list.filter(el => match(el.label, value).length === parts),
    })
  }

  handleListClear = () => {
    this.props.action('onListClear')()
    this.setState({
      list: [],
    })
  }
}
