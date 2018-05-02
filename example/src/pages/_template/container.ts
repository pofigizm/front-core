import { connect } from 'react-redux'
import { getLocation } from 'front-core/src/selectors'
import { apiExampleSelectors } from './api'

import * as actions from './actions'
import * as selectors from './selectors'

import Template from './components'

const mapState = state => ({
  ...selectors.getState(state),
  location: getLocation(state),
  entries: apiExampleSelectors.getEntries(state),
  arrayOfEntries: apiExampleSelectors.getArrayOfEntries(state),
})

export default connect(mapState, actions)(Template)
