/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import cn from 'classnames'
import Typography from 'src/components/typography'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
    '& > a': {
      textDecoration: 'none',
      color: theme.palette.secondary.light,
    },
    '& > a:visited': {
      color: theme.palette.secondary.light,
    },
  },
  opacity: {
    opacity: 0.5,

    '&:hover': {
      opacity: 1,
    },
  },
  separator: {
    padding: [0, theme.spacing.unit],
  },
})

const DefaultLink = ({ to, text }) => <a href={to}>{ text }</a>

class Breadcrumbs extends PureComponent {
  render() {
    const {
      className, classes, list = [], solid, Link = DefaultLink,
    } = this.props
    debug('render', this.props)

    const elements = list.length < 2 ?
      list :
      list.reduce((acc, el) => [].concat(acc, { separator: true }, el))

    return (
      <Typography className={cn(className, classes.root, !solid && classes.opacity)}>
        { elements.map((element, index) => {
          if (element.separator) {
            return this.renderSeparator(index, classes)
          }
          if (element.to) {
            return (
              <Link key={index} text={element.text} to={element.to} />
            )
          }
          return (
            <span key={index}>{element.text}</span>
          )
        }) }
      </Typography>
    )
  }

  renderSeparator = (key, classes) => (
    <span key={key} className={cn(classes.separator)}>/</span>
  )
}

const WrappedBreadcrumbs = withStyles(styles, { name: 'fcBreadcrumbs' })(Breadcrumbs)

const listSchema = PropTypes.shape({
  text: PropTypes.string.isRequred,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
})

WrappedBreadcrumbs.propTypes = {
  Link: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.arrayOf(listSchema),
  solid: PropTypes.bool,
}

export default WrappedBreadcrumbs
