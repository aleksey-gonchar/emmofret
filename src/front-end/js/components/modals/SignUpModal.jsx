import ModalActions from '../../actions/ModalActions.js'
import UserActions from '../../actions/UserActions.js'
import ModalStore from '../../stores/ModalStore.js'
import _ from 'lodash'

import FullNameInput from '../inputs/FullNameInput.jsx'
import EmailInput from '../inputs/EmailInput.jsx'
import PasswordInput from '../inputs/PasswordInput.jsx'

let { Modal, Button } = RB
let { Header, Body, Title, Footer } = Modal

class SignUpModal extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      form : {
        fullName: '',
        email: '',
        password: ''
      },
      isFormCompleted: false
    }
    this.state = _.extend(this.state, this.getStoreState())

    this.onChangeStore = this.onChangeStore.bind(this)
    this.signUp = this.signUp.bind(this)
    this.checkSubmitBtnState = this.checkSubmitBtnState.bind(this)
    this.onChangeFormState = this.onChangeFormState.bind(this)
    this.submitOnReturn = this.submitOnReturn.bind(this)
  }

  checkSubmitBtnState () {
    let isAllValid =  _.every(this.state.form, (prop, key) => {
      if (_.isObject(prop)) {
        return prop.isValid
      } else
        return false
    })

    this.setState({ isFormCompleted : isAllValid })
  }

  getStoreState () {
    return {
      store: ModalStore.getState().get('sign-up')
    }
  }

  componentDidMount () {
    ModalStore.addChangeListener(this.onChangeStore)
    this.mounted = true
  }

  componentWillUnmount () {
    ModalStore.removeChangeListener(this.onChangeStore)
    this.mounted = false
  }

  close () {
    ModalActions.hide('sign-up')
  }

  onChangeFormState (propName) {
    return (newValue) => {
      let state = { form: this.state.form }
      state.form[propName] = newValue
      this.setState(state)

      _.debounce(this.checkSubmitBtnState, 200)()
    }
  }

  onChangeStore () {
    if(!this.mounted) return

    this.setState(this.getStoreState())
  }

  signUp () {
    let data = {
      firstName : this.state.form.fullName.firstName,
      lastName : this.state.form.fullName.lastName,
      email : this.state.form.email.value,
      password : this.state.form.password.value
    }
    UserActions.signUp(data)
  }

  submitOnReturn (e) {
    if(e.charCode === 13 && this.state.isFormCompleted) {
      this.signUp()
    }
  }

  render () {
    let btnProps = {}

    if (this.state.isFormCompleted) {
      btnProps.disabled = false
    } else {
      btnProps.disabled = true
    }

    let inputProps = {
      onKeyPress: this.submitOnReturn,
    }

    return (
      <Modal show={this.state.store.get('isOpen')} onHide={this.close} bsSize='sm'>
        <Header closeButton>
          <Title>Sign up</Title>
        </Header>
        <Body>
          <FullNameInput onSave={this.onChangeFormState('fullName')} {...inputProps}/>
          <EmailInput onSave={this.onChangeFormState('email')} {...inputProps}/>
          <PasswordInput visible onSave={this.onChangeFormState('password')} {...inputProps}/>
        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.signUp} {...btnProps}>Sign up</Button>
        </Footer>
      </Modal>
    )
  }
}

export default SignUpModal