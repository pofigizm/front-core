import Create from '@material-ui/icons/Create'
import Delete from '@material-ui/icons/Delete'
import Done from '@material-ui/icons/Done'
import Refresh from '@material-ui/icons/Refresh'

export default [
  ({ action }) => ({
    _preview: 'basic usage',
    onClick: action('onClick'),
    label: 'Add',
    Icon: Create,
    list: [{
      id: 0,
      label: 'delete',
      Icon: Delete,
      onClick: action('onClick-delete'),
    }, {
      id: 1,
      label: 'done',
      Icon: Done,
      onClick: action('onClick-done'),
      color: 'secondary',
    }, {
      id: 2,
      label: 'refresh',
      Icon: Refresh,
      onClick: action('onClick-refresh'),
    }],
  }),

  () => ({
    _preview: 'opened',
    _skip: true,
    label: 'too many words',
    Icon: Create,
    open: true,
    showTooltips: true,
    list: [{
      id: 0,
      label: 'delete',
      Icon: Delete,
    }, {
      id: 1,
      label: 'done',
      Icon: Done,
      color: 'secondary',
    }, {
      id: 2,
      label: 'refresh',
      Icon: Refresh,
    }],
  }),
]
