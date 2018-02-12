import React, { PureComponent } from 'react'
import cn from 'classnames'
import { withStyles } from '../styles'

import CircularProgress from 'material-ui/Progress/CircularProgress'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {},
  loading: {
    display: 'flex',
    justifyContent: 'center',
  },
  loader: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
  },
})

class Loading extends PureComponent {
  render() {
    const { classes } = this.props
    debug('render', this.props)

    return (
      <div className={cn(classes.loading)}>
        <CircularProgress className={cn(classes.loader)} size={50} />
      </div>
    )
  }
}

export default withStyles(styles)(Loading)
