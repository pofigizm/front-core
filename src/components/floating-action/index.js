import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import Add from 'material-ui-icons/Add'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,

    '&:not($opened) $icon$opened': {
      opacity: 0,
      transform: 'rotate(225deg)',
    },
    '&$opened $icon:not($opened)': {
      opacity: 0,
      transform: 'rotate(-225deg)',
    },
  },
  opened: {},
  item: {
    padding: theme.spacing.unit,
  },
  itemOpened: {
    marginLeft: theme.spacing.unit * 20,
  },
  button: {
    position: 'relative',
  },
  smallButton: {
    composes: '$button',
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit,
  },
  icon: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
  },
  smallIcon: {
    composes: '$icon',
    top: theme.spacing.unit,
    left: theme.spacing.unit,
  },
  plusIcon: {
    top: theme.spacing.unit * 1.5,
    left: theme.spacing.unit * 1.5,
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  content: {
    margin: theme.spacing.unit,
  },
})

class FloatingAction extends PureComponent {
  state = {
    opened: this.props.open || false,
  }

  render() {
    const {
      classes,
      className,
      label = '',
      Icon = Add,
      list = [],
      showTooltips,
      onClick,
    } = this.props
    const { opened } = this.state
    debug('render', this.props)

    return (
      <div
        className={cn(className, classes.root, opened && classes.opened)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        { opened && (
          [...list].reverse().map(action => (
            <div
              key={action.id}
              className={cn(classes.item, opened && classes.itemOpened)}
              onClick={this.handleClick(action.onClick)}
            >
              <Tooltip title={action.label} open={showTooltips} placement="left" >
                <Button variant="fab" color={action.color || 'primary'} className={cn(classes.smallButton)} >
                  <action.Icon className={cn(classes.smallIcon, classes.opened)} />
                </Button>
              </Tooltip>
            </div>
          ))
        ) }
        <div
          className={cn(classes.item, opened && classes.itemOpened)}
          onClick={this.handleClick(onClick)}
        >
          <Tooltip title={label} open={showTooltips} placement="left">
            <Button variant="fab" color="secondary" className={cn(classes.button)} >
              <Add className={cn(classes.icon, classes.plusIcon)} />
              <Icon className={cn(classes.icon, classes.opened)} />
            </Button>
          </Tooltip>
        </div>
      </div>
    )
  }

  handleClick = action => () => {
    if (!action) return
    action()
  }

  handleMouseEnter = () => {
    if (typeof this.props.open !== 'undefined') return
    this.setState({ opened: true })
  }

  handleMouseLeave = () => {
    if (typeof this.props.open !== 'undefined') return
    this.setState({ opened: false })
  }
}

const WrappedFloatingAction = withStyles(styles, { name: 'fcFloatingAction' })(FloatingAction)

const listSchema = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  Icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func,
})

WrappedFloatingAction.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.arrayOf(listSchema),
  open: PropTypes.bool,
  showTooltips: PropTypes.bool,

  onClick: PropTypes.func,
}

export default WrappedFloatingAction
