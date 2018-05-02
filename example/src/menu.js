import { isEnabled } from 'front-core/src/flags'
import Storage from '@material-ui/icons/Storage'
import PieChart from '@material-ui/icons/PieChart'

export const menu = [
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
