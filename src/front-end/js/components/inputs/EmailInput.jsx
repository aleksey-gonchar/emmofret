let { Input } = RB

class EmailInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      placeholder: props.placeholder,
    }
  }

  validateState () {
    return ''
  }

  onChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  onSave () {
    this.props.onSave(this.state.value)
  }

  render () {
    let icon = <Icon fw name='envelope-o'/>
    return (
      <Input
        addonBefore={icon}
        type='text' ref='EmailInput'
        id={this.props.id}
        className={this.props.className}
        placeholder={this.props.placeholder}
        hasFeedback
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onBlur={this.onSave.bind(this)}
        autoFocus={true}
        />
    )
  }
}

EmailInput.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string
}

EmailInput.defaultProps = {
  value: '',
  placeholder: 'your@email.com'
}

export default EmailInput