import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './Auth.css'
import Button from '../../Components/Common/UI/Button/Button'
import Input from '../../Components/Common/UI/Input/Input'
import * as actions from '../../Redux/Actions/authActions'
import Spinner from '../../Components/Common/UI/Spinner/Spinner'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  }

  checkValidity(value, rules) {
    let isValid = true
    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/
      isValid = pattern.test(value) && isValid
    }

    return isValid
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({ controls: updatedControls })
  }

  submitHandler = event => {
    event.preventDefault()
    console.log('executing on auth')
    const { controls } = this.state
    if (controls && controls.email.value && this.state.controls.password.value) {
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignUp
      )
    }
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ))

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch To {this.state.isSignUp ? 'Sign In' : 'SignUp'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authStore.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
