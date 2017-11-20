import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import cn from 'classnames'

const styles = () => ({
  root: {
  },
})

class Template extends PureComponent {
  render() {
    const { classes } = this.props
    return (
      <div className={cn(classes.root)}>
        Template of base component
      </div>
    )
  }
}

export default withStyles(styles)(Template)
