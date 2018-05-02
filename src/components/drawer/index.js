import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import cn from 'classnames'
import OriginDrawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
})

class Drawer extends PureComponent {
  render() {
    const {
      classes,
      open,
      variant = 'permanent',
      children,
      onClickDrawerButton,
    } = this.props
    debug('render', this.props)

    return (
      <OriginDrawer
        variant={variant}
        classes={{
          paper: cn(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={onClickDrawerButton}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          { children }
        </div>
      </OriginDrawer>
    )
  }
}

const WrappedDrawer = withStyles(styles, { name: 'fcDrawer' })(Drawer)

WrappedDrawer.propTypes = {
  ...OriginDrawer.propTypes,
  onClickDrawerButton: PropTypes.func,
}

export default WrappedDrawer
