import React, { PureComponent } from 'react'
import cn from 'classnames'
import { withStyles } from 'src/components/origin'

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
