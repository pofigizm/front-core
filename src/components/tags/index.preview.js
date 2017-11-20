import React, { PureComponent } from 'react'
import match from 'autosuggest-highlight/match'

const getSelected = count => Array(count)
  .fill(0)
  .map((e, i) => ({
    id: i,
    label: `super tag-${i + 1}`,
  }))

const selected = getSelected(2)

export default [
  () => ({
    _preview: 'without props',
  }),

  () => ({
    _preview: 'only label',
    label: 'tags',
  }),

  () => ({
    _preview: 'with text',
    label: 'tags',
    value: 'tag',
  }),

  () => ({
    _preview: 'with list and text',
    label: 'tags',
    value: 'tag',
    selected,
  }),

  () => ({
    _preview: 'very mach tags',
    label: 'tags',
    selected: getSelected(20),
  }),

  ({ action }) => ({
    _preview: 'with handlers',
    label: 'tags',
    selected,
    onDelete: action('onDelete'),
    onChange: action('onChange'),
  }),

  ({ action }) => ({
    _preview: 'with handlers',
    label: 'tags',
    value: 'tag',
    selected,
    onDelete: action('onDelete'),
    onChange: action('onChange'),
    readOnly: true,
  }),
]
const selectedForState = getSelected(20)
export class State extends PureComponent {
  state = {
    value: '',
    selected: selectedForState.slice(0, 2),
    list: [],
  }

  render() {
    const { Target } = this.props

    return (
      <Target
        label="state"
        {...this.state}
        onDelete={this.handleDelete}
        onChange={this.handleChange}
        onListClear={this.handleListClear}
        onListFetch={this.handleListFetch}
        onSelect={this.handleSelect}
      />
    )
  }
  handleChange = (value) => {
    this.props.action('onChange')(value)
    this.setState({
      value,
    })
  }

  handleDelete = (id) => {
    this.props.action('onDelete')(id)
    this.setState({
      selected: this.state.selected.filter(el => el.id !== id),
    })
  }

  handleSelect = (id) => {
    this.props.action('onSelect')(id)
    this.setState({
      selected: [
        ...this.state.selected,
        selectedForState.find(el => el.id === id),
      ],
      value: '',
    })
  }

  handleListFetch = (value) => {
    this.props.action('onListFetch')(value)
    const parts = value.split(' ').filter(el => el).length
    this.setState({
      list: selectedForState
        .filter(el => !this.state.selected.find(s => s.id === el.id))
        .filter(el => match(el.label, value).length === parts),
    })
  }

  handleListClear = () => {
    this.props.action('onListClear')()
    this.setState({
      list: [],
    })
  }
}
