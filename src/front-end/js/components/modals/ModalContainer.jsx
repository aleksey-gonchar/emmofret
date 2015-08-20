import ModalStore from '../../stores/ModalStore.js'
import ModalActions from '../../actions/ModalActions.js'
import LoginModal from './LoginModal.jsx'
import SignUpModal from './SignUpModal.jsx'

import _ from 'lodash'

class ModalContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getStoreState()

    this.onChangeStore = this.onChangeStore.bind(this)
  }

  getStoreState () {
    return {
      store: ModalStore.getState()
    }
  }

  componentDidMount () {
    ModalStore.on('change', this.onChangeStore)
  }

  componentWillUnmount () {
    ModalStore.off('change', this.onChangeStore, this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    let currMdlName = _.result(_.findWhere(this.state.store, { isOpen: true }), 'name')
    let nextMdlName = _.result(_.findWhere(nextState.store, { isOpen: true }), 'name')

    return !currMdlName || !nextMdlName || currMdlName !== nextMdlName
  }

  onChangeStore () {
    this.setState(this.getStoreState())
  }

  render () {
    let modalName = _.result(_.findWhere(this.state.store, { isOpen: true }), 'name')
    let modalCmp = null

    if (!modalName)
      modalCmp = null
    else if (modalName == 'login')
      modalCmp = ( <LoginModal /> )
    else if (modalName == 'sign-up')
      modalCmp = ( <SignUpModal /> )

    return (
      <div id='modal-container'>
        {modalCmp}
      </div>
    )
  }
}

export default ModalContainer