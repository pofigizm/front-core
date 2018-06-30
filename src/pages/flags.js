import React, { PureComponent } from 'react'
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from 'src/components/typography'
import Checkbox from 'src/components/checkbox'
import Button from 'src/components/button'
import { state, storageKey } from 'src/flags'
import { read, write } from 'src/utils/storage'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = theme => ({
  root: {
  },
  body: {
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    marginBottom: theme.spacing.unit,
  },
  clean: {
    marginBottom: theme.spacing.unit,
    width: 'auto',
  },
})

const getString = (t, f) => `${f} (config - ${state[t] && state[t][f] ? 'true' : 'false'}) `

class Flags extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      features: Object.keys(state.features),
      develop: Object.keys(state.develop),
      flags: read(storageKey),
    }
  }

  render() {
    const { classes } = this.props
    const { flags } = this.state
    debug('render', this.props, this.state)
    const disableClean = Boolean(!Object.keys(flags).length)

    return (
      <div className={cn(classes.root)}>
        { this.renderList('Feature flags', 'features') }
        { __LOC__ && this.renderList('Develop flags', 'develop') }
        <Button
          className={cn(classes.clean)}
          label="Clean all extended flags"
          raised
          readOnly={disableClean}
          onClick={this.handleClean}
        />
      </div>
    )
  }

  renderList = (title, type) => {
    const { classes } = this.props
    const list = this.state[type]

    if (!list.length) return null
    const extended = this.state.flags[type] || {}

    return (
      <div className={cn(classes.body)}>
        <Typography type="title" className={cn(classes.title)}>
          { title }
        </Typography>
        { list.map(flag => (
          <Checkbox
            key={flag}
            label={getString(type, flag)}
            value={(flag in extended) ? extended[flag] : state[type][flag]}
            onChange={this.handleChange(type, flag)}
          />
        )) }
      </div>
    )
  }

  handleChange = (type, key) => (value) => {
    this.setState({
      flags: {
        ...this.state.flags,
        [type]: {
          ...this.state.flags[type] || {},
          [key]: value,
        },
      },
    }, () => {
      write(storageKey, this.state.flags)
    })
  }

  handleClean = () => {
    this.setState({
      flags: {},
    })
    write(storageKey, {})
  }
}

export default withStyles(styles)(Flags)
