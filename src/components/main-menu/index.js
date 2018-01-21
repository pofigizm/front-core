/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
})

const defLink = ({ children }) => (<div>{ children }</div>)

class MainMenu extends PureComponent {
  render() {
    const {
      classNames, classes, list = [], Link = defLink,
    } = this.props

    return (
      <List className={cn(classes.root, classNames)}>
        { list.map((element, id) => {
          // TODO remove it when redux-first-router has been updated
          // https://github.com/faceyspacey/redux-first-router-link/issues/75
          if (element.link.startsWith('http')) {
            return (
              <a key={id} href={element.link} className={cn(classes.link)}>
                <ListItem button>
                  <ListItemIcon>
                    <element.Icon />
                  </ListItemIcon>
                  <ListItemText inset primary={element.name} />
                </ListItem>
              </a>
            )
          }

          return (
            <Link key={id} to={element.link} className={cn(classes.link)}>
              <ListItem button>
                <ListItemIcon>
                  <element.Icon />
                </ListItemIcon>
                <ListItemText inset primary={element.name} />
              </ListItem>
            </Link>
          )
        }) }
      </List>
    )
  }
}

export default withStyles(styles, { name: 'fcMenu' })(MainMenu)
