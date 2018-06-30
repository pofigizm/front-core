import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import OriginAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const drawerWidth = 240

const styles = theme => ({
  root: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  shift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  main: {
    flex: 1,
  },
  extended: {
    marginRight: theme.spacing.unit * 2,
  },
  userName: {
    marginRight: theme.spacing.unit * 2,
  },
  loginButton: {
    marginRight: theme.spacing.unit * 2,
  },
  menuButton: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 4,
  },
  hide: {
    display: 'none',
  },
})

class AppBar extends PureComponent {
  render() {
    const {
      className,
      classes,
      open = false,
      userName,
      Logo = <span />,
      children,
      onClickDrawerButton,
      onClickLoginButton,
    } = this.props
    debug('render', this.props)
    const buttonText = userName ? 'Sign out' : 'Sign in'

    return (
      <OriginAppBar className={cn(className, classes.root, open && classes.shift)}>
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onClickDrawerButton}
            className={cn(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={cn(classes.main)} variant="title" color="inherit" noWrap>
            { Logo }
          </Typography>
          <div className={cn(classes.extended)}>
            { children }
          </div>
          <Typography className={cn(classes.userName)} color="inherit" noWrap>
            { userName }
          </Typography>
          <Button
            color="inherit"
            className={cn(classes.loginButton)}
            onClick={onClickLoginButton}
          >
            { buttonText }
          </Button>
        </Toolbar>
      </OriginAppBar>
    )
  }
}

const WrappedAppBar = withStyles(styles, { name: 'fcAppBar' })(AppBar)

WrappedAppBar.propTypes = {
  Link: PropTypes.element,
  className: PropTypes.string,
  open: PropTypes.bool,
  userName: PropTypes.string,
  onClickDrawerButton: PropTypes.func,
  onClickLoginButton: PropTypes.func,
}

export default WrappedAppBar
