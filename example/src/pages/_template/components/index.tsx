import * as React from 'react'
import * as cn from 'classnames'

import { withStyles } from 'front-core/src/components/styles'
import { Typography } from 'front-core/src/components'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = () => ({
  root: {
  },
  title: {
    marginBottom: 20,
  },
})

interface Template {
  classes: any
  location: any
}

class Template extends React.PureComponent<Template> {
  render() {
    const { classes, location } = this.props
    const propsJson = JSON.stringify(this.props, null, 2)
    debug('render', this.props)

    return (
      <div className={cn(classes.root)}>
        <Typography type="title" className={cn(classes.title)}>
          {location.type}
        </Typography>
        <Typography>
          <pre>
            {propsJson}
          </pre>
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Template)
