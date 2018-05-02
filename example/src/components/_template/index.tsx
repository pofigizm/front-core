import * as React from 'react'
import * as cn from 'classnames'
import { withStyles } from 'front-core/src/components/styles'

const styles = () => ({
  root: {
  },
})

interface Template {
  classes: any
  value: string
}

class Template extends React.PureComponent<Template> {
  render() {
    const { classes, value } = this.props
    return (
      <div className={cn(classes.root)}>
        Template of base component with value: {value}
      </div>
    )
  }
}

export default withStyles(styles)(Template)
