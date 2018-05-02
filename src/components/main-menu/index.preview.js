import StorageIcon from '@material-ui/icons/Storage'
import Phone from '@material-ui/icons/Phone'

const menu = [
  {
    name: 'Storages',
    Icon: StorageIcon,
    link: '/storages',
  }, {
    name: 'Phones',
    Icon: Phone,
    link: '/phones',
  },
]

export default [
  () => ({
    _preview: 'without props',
    list: menu,
  }),
]
