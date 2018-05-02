import { isEnabled } from 'front-core/src/flags'
import Storage from '@material-ui/icons/Storage'
import PieChart from '@material-ui/icons/PieChart'

const title: string = 'App title'

const routes = {
  root: {
    path: '/',
    modulePath: '_template',
  },

  template: {
    path: '/template',
    modulePath: '_template',
    role: true,
  },

  ...(isEnabled('feature-page') ? {
    feature: {
      path: '/page-under-flag',
      modulePath: '_template',
    },
  } : {}),
}

const menu = [
  {
    name: 'Root',
    Icon: Storage,
    link: '/',
  },

  {
    name: 'Template',
    Icon: PieChart,
    link: '/template',
  },

  ...(isEnabled('feature-page') ? [{
    name: 'Page with flag',
    Icon: Storage,
    link: '/page-under-flag',
  }] : []),
]

export {
  title,
  routes,
  menu,
}
