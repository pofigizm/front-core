import { connect } from 'react-redux'
import Button from 'front-core/src/components/button'

const mapState = () => ({
  label: 'Extended top',
})

const mapDispatch = dispatch => ({
  onClick: () => {
    dispatch({
      type: 'EXTENDED_TOP_ACTION',
    })
    // or do something else
  },
})

export default connect(mapState, mapDispatch)(Button)
