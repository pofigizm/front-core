import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { NavLink } from 'redux-first-router-link'

import { memoize } from 'src/utils/functions'

import AppBar from './app-bar'
import Drawer from './drawer'
import MainMenu from './main-menu'
import Snackbar from './snackbar'
import Alert from './alert'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  '@global body': {
    margin: 0,
    padding: 0,
  },
  root: {
    width: '100%',
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  logo: {
    color: '#fff',
    textDecoration: 'none',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
})

class Index extends PureComponent {
  render() {
    const {
      classes,
      mainMenuOpen,
      user,
      messageList,
      title,
      menu,
      authRequired,

      toggleMenu,
      loginRequest,
      onHideMessage,
      children,
    } = this.props
    debug('render', this.props)

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            Logo={this.renderLogo(classes, title)}
            open={mainMenuOpen}
            userName={user.name}
            onClickDrawerButton={toggleMenu}
            onClickLoginButton={loginRequest}
          />
          <Drawer
            open={mainMenuOpen}
            onClickDrawerButton={toggleMenu}
          >
            <MainMenu list={menu} Link={NavLink} />
          </Drawer>
          <main className={classes.content}>
            { children }
          </main>
          <Snackbar list={messageList} onHideMessage={onHideMessage} />
        </div>
        <Alert
          open={authRequired}
          title="Authorization required"
          text="Enter login and password on next page"
          actionLabel="Sign in"
          action={loginRequest}
        />
      </div>
    )
  }

  renderLogo = memoize((classes, title) => (
    <NavLink className={classes.logo} to="/" >
      { title }
    </NavLink>
  ))
}

export default withStyles(styles, { name: 'fcAppIndex' })(Index)
