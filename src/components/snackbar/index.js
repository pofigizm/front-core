import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import OriginSnackbar, { SnackbarContent } from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  content: {
    margin: theme.spacing.unit,
  },
})

class Snackbar extends PureComponent {
  render() {
    const {
      classes,
      className,
      list = [],
      onHideMessage,
    } = this.props
    debug('render', this.props)
    const open = Boolean(list.length)

    return (
      <OriginSnackbar
        className={cn(className, classes.root)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
      >
        <div>
          { list.map(message => (
            <SnackbarContent
              key={message.id}
              className={cn(classes.content)}
              message={message.content}
              action={
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={cn(classes.close)}
                  onClick={() => onHideMessage(message.id)}
                >
                  <CloseIcon />
                </IconButton>
              }
            />
          )) }
        </div>
      </OriginSnackbar>
    )
  }
}

const WrappedSnackbar = withStyles(styles, { name: 'fcSnackbar' })(Snackbar)

const listSchema = PropTypes.shape({
  id: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
})

WrappedSnackbar.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(listSchema),
  onHideMessage: PropTypes.func,
}

export default WrappedSnackbar
