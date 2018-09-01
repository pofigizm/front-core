import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import cn from 'classnames'
import OriginTableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = () => ({
  root: {},
  center: {
    textAlign: 'center',
  },
})

class TableHead extends PureComponent {
  render() {
    const {
      classes, columns = [], orderBy, orderDirection,
    } = this.props
    debug('render')

    return (
      <OriginTableHead className={cn(classes.root)}>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              className={cn(column.centered && classes.center)}
              numeric={column.numeric}
              padding={column.padding}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderDirection}
                onClick={this.handleRequestSort(column.id, column.disableOrdering)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
            ), this)}
        </TableRow>
      </OriginTableHead>
    )
  }

  handleRequestSort = (fieldName, disable) => () => {
    const { onRequestSort } = this.props

    if (disable || !onRequestSort) return
    onRequestSort(fieldName)
  }
}

const WrappedTableHead = withStyles(styles, { name: 'fcTableHead' })(TableHead)

const columnSchema = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disablePadding: PropTypes.bool,
  disableOrdering: PropTypes.bool,
  numeric: PropTypes.bool,
  centered: PropTypes.bool,
})

WrappedTableHead.propTypes = {
  columns: PropTypes.arrayOf(columnSchema),
  orderBy: PropTypes.string,
  orderDirection: PropTypes.string,
  onRequestSort: PropTypes.func,
}

export default WrappedTableHead
