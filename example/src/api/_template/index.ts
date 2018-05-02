import * as actions from './actions'
import * as selectors from './selectors'
import * as constants from './constants'
import reducer from './reducer'

const reducers = {
  [constants.STORE_KEY]: reducer,
}

export { actions, selectors, constants, reducers }
