import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import cn from 'classnames'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '../button'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
  },
  title: {
    margin: [
      theme.spacing.unit,
      0,
    ],
  },
  content: {
    '& > *': {
      margin: [
        theme.spacing.unit,
        0,
      ],
    },
  },
  actions: {
    margin: theme.spacing.unit * 2,
  },
})

class Alert extends PureComponent {
  render() {
    const {
      classes,
      open = false,
      title,
      text,
      actionLabel,

      action,
    } = this.props
    debug('render', this.props)

    return (
      <Dialog
        className={cn(classes.root)}
        open={open}
        onExit={action}
      >
        <DialogTitle className={cn(classes.title)} >
          {title}
        </DialogTitle>
        <DialogContent className={cn(classes.content)} >
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={cn(classes.actions)} >
          <Button onClick={action} label={actionLabel} />
        </DialogActions>
      </Dialog>
    )
  }
}

const WrappedAlert = withStyles(styles, { name: 'fcAlert' })(Alert)

export default WrappedAlert
