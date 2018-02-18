/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'

import Textarea from 'src/components/textarea'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import AddCircle from 'material-ui-icons/AddCircle'
import DeleteIcon from 'material-ui-icons/Delete'
import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from 'material-ui/Table'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
    position: 'relative',
  },
  label: {
    paddingLeft: theme.spacing.unit * 2,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  head: {
    height: theme.spacing.unit * 5,
  },
  cell: {
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 0.5,
    paddingBottom: theme.spacing.unit * 0.5,
    verticalAlign: 'bottom',
  },
  cellTop: {
    verticalAlign: 'top',
  },
  removeBorder: {
    borderBottom: 'none',
  },
  iconCell: {
    width: theme.spacing.unit * 3,
  },
  iconEmpty: {
    width: theme.spacing.unit,
  },
  numberColl: {
    width: theme.spacing.unit * 3,
  },
  number: {
    padding: [
      theme.spacing.unit,
      0,
    ],
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  row: {
    height: theme.spacing.unit * 5,
  },
  action: {
    marginLeft: theme.spacing.unit * 0.5,
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
    opacity: 0.5,

    '&:hover': {
      opacity: 1,
    },
  },
  addIcon: {
    color: theme.palette.primary.light,
  },
  deleteIcon: {
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2,
    color: theme.palette.secondary.light,
  },
  empty: {
    paddingLeft: theme.spacing.unit * 2,
  },
})

class List extends PureComponent {
  render() {
    const {
      classes,
      className,
      border,
      top,
      numbers,
      label,
      columns = [],
      rows = [],
      readOnly,
    } = this.props
    debug('render', this.props)
    const shrink = Boolean(rows.length)

    return (
      <div className={cn(className, classes.root)}>
        <Typography className={cn(classes.label, shrink && classes.shrink)} >
          { label }
        </Typography>
        <Table className={cn(className, classes.root)} >
          <TableHead>
            <TableRow
              className={cn(classes.head)}
            >
              <TableCell
                className={cn(!readOnly && classes.iconCell, readOnly && classes.iconEmpty)}
                padding="none"
              >
                { !readOnly && (
                  <IconButton
                    className={cn(classes.action)}
                    onClick={this.handleAdd}
                  >
                    <AddCircle
                      className={cn(classes.addIcon)}
                    />
                  </IconButton>
                ) }
                { !shrink && readOnly && (
                  <span className={cn(classes.empty)} >
                    Not filled
                  </span>
                ) }
              </TableCell>
              { numbers && (
                <TableCell
                  className={cn(classes.numberColl)}
                  padding="none"
                />
              ) }
              { shrink && columns
                .filter(c => !c.hidden)
                .map((column, ix) => (
                  <TableCell
                    key={ix}
                    padding="none"
                  >
                    {column.label}
                  </TableCell>
                  ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((row, ix) => (
              <TableRow
                key={ix}
                className={cn(classes.row)}
              >
                <TableCell
                  className={cn(classes.cell, top && classes.cellTop, !border && classes.removeBorder)}
                  padding="none"
                >
                  { !readOnly && (
                    <IconButton
                      className={cn(classes.action)}
                      onClick={this.handleDelete(ix)}
                    >
                      <DeleteIcon
                        className={cn(classes.deleteIcon)}
                      />
                    </IconButton>
                  ) }
                </TableCell>
                { numbers && (
                  <TableCell
                    className={cn(classes.cell, top && classes.cellTop, !border && classes.removeBorder)}
                    padding="none"
                  >
                    <div className={cn(classes.number)} >
                      { ix + 1 }
                    </div>
                  </TableCell>
                ) }
                { columns
                  .filter(c => !c.hidden)
                  .map((column, cix) => (
                    <TableCell
                      key={String(ix) + String(cix)}
                      className={cn(classes.cell, top && classes.cellTop, !border && classes.removeBorder)}
                      padding="none"
                    >
                      { !column.component && (
                        <Textarea
                          readOnly={readOnly}
                          value={row[column.id]}
                          onChange={this.handleChange(ix, column.id)}
                        />
                      ) }
                      { column.component &&
                        this.renderComponent(
                          column.component,
                          row[column.id],
                          this.handleChange(ix, column.id),
                        )
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </div>
    )
  }

  renderComponent = (Comp, value, onChange) => {
    const { readOnly } = this.props
    return (
      <Comp
        readOnly={readOnly}
        value={value}
        onChange={onChange}
      />
    )
  }

  // TODO separate next to actions (may be)

  handleChange = (ix, field) => (value) => {
    const { rows, onChange } = this.props
    if (!onChange) return

    const nextRow = {
      ...rows[ix],
      [field]: value,
    }
    const next = [
      ...rows.slice(0, ix),
      nextRow,
      ...rows.slice(ix + 1),
    ]
    onChange(next)
  }

  handleAdd = () => {
    const { columns, rows, onChange } = this.props
    if (!onChange) return

    const next = [
      ...rows,
      columns.reduce((acc, el) => ({
        ...acc,
        [el.id]: el.default || '',
      }), {}),
    ]
    onChange(next)
  }

  handleDelete = ix => () => {
    const { rows, onChange } = this.props
    if (!onChange) return

    const next = [
      ...rows.slice(0, ix),
      ...rows.slice(ix + 1),
    ]
    onChange(next)
  }
}

const WrappedList = withStyles(styles, { name: 'fcList' })(List)

const columnSchema = PropTypes.shape({
  id: PropTypes.string.isRequred,
  label: PropTypes.string,
  hidden: PropTypes.bool,
  default: PropTypes.any,
})

WrappedList.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(columnSchema),
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object),

  onChange: PropTypes.func,
}

export default WrappedList
