import Storage from 'material-ui-icons/Storage'
import render from './root'

const routes = {
  home: {
    path: '/',
  },
}

const menu = [
  {
    name: 'home',
    Icon: Storage,
    link: '/',
  },
]

render({ title: 'App root', routes, menu })
