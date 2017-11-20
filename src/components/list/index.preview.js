import React, { PureComponent } from 'react'
import Checkbox from 'src/components/checkbox'

const label = 'Editable list'
const columns = [
  { id: 'type', hidden: true, default: 'step' },
  { id: 'action', label: 'Action' },
  { id: 'data', label: 'Data' },
]
const withComponent =
  {
    id: 'check', label: 'Checked', component: Checkbox, default: true,
  }
const rows = [
  { type: 'step', action: 'action-1', data: 'data-1' },
  { type: 'step', action: 'action-2', data: 'data-2' },
  { type: 'step', action: 'action-3', data: 'data-3' },
]

export default [
  ({ action }) => ({
    _preview: 'basic usage',
    label,
    columns,
    rows,
    onChange: action('onChange'),
  }),
  ({ action }) => ({
    _preview: 'with numbers',
    numbers: true,
    label,
    columns,
    rows,
    onChange: action('onChange'),
  }),
  ({ action }) => ({
    _preview: 'with border',
    border: true,
    label,
    columns,
    rows,
    onChange: action('onChange'),
  }),
  ({ action }) => ({
    _preview: 'with border & top',
    border: true,
    top: true,
    label,
    columns,
    rows,
    onChange: action('onChange'),
  }),
  ({ action }) => ({
    _preview: 'with component',
    label: 'List',
    columns: columns.concat(withComponent),
    rows: rows.map(el => ({ ...el, check: true })),
    onChange: action('onChange'),
  }),
  ({ action }) => ({
    _preview: 'read only',
    label,
    columns: columns.concat(withComponent),
    rows: rows.map(el => ({ ...el, check: true })),
    readOnly: true,
    onChange: action('onChange'),
  }),
  ({ action }) => ({
    _preview: 'empty',
    label,
    columns,
    onChange: action('onChange'),
  }),
  ({ action }) => ({
    _preview: 'empty read only',
    label,
    columns,
    readOnly: true,
    onChange: action('onChange'),
  }),
]

export class State extends PureComponent {
  state = {
    columns: columns.concat(withComponent),
    rows: rows.map(el => ({ ...el, check: true })),
  }

  render() {
    const { Target } = this.props

    return (
      <Target
        {...this.state}
        label={label}
        onChange={this.handleChange}
      />
    )
  }

  handleChange = (rows) => {
    this.props.action('onChange')(rows)
    this.setState({
      rows,
    })
  }
}
