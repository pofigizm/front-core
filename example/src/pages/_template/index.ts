import * as actions from './actions'
import * as constants from './constants'
import * as selectors from './selectors'
import reducer from './reducer'
import container from './container'

import { apiExampleReducers } from './api'

const apiReducers = {
  ...apiExampleReducers,
}

export default container
export { actions, constants, selectors, reducer, apiReducers }
