import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import cn from 'classnames'
import Breadcrumbs from 'src/components/breadcrumbs'
import Typography from 'src/components/typography'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    height: theme.spacing.unit * 6,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: theme.spacing.unit,
  },
})

class Header extends PureComponent {
  render() {
    const {
      className, classes, title, breadcrumbs, Link, children,
    } = this.props
    debug('render', this.props)

    return (
      <div className={cn(className, classes.root)}>
        <div className={cn(classes.main)}>
          <Breadcrumbs list={breadcrumbs} Link={Link} />
          <Typography variant="title" className={cn(classes.title)}>
            { title }
          </Typography>
        </div>
        { children }
      </div>
    )
  }
}

const WrappedHeader = withStyles(styles, { name: 'fcHeader' })(Header)

WrappedHeader.propTypes = {
  Link: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  breadcrumbs: Breadcrumbs.propTypes.list,
  children: PropTypes.element,
  className: PropTypes.string,
  title: PropTypes.string,
}

export default WrappedHeader
