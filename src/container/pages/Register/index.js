import React, {Component} from 'react';
import './Register.scss'

import { registerUserAPI } from '../../../config/redux/action';
import Button from '../../../component/atoms/Button';
import { connect } from 'react-redux';


class Register extends Component {
    state ={
        email: '',
        password: '',
    }
    
    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleRegisterSubmit = () => {
        const {email, password} = this.state;
        this.props.registerAPI({email, password})
        this.setState({
            email: '',
            password: '',
        })
    }

    render() {
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input value={this.state.email} className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} />
                    <input value={this.state.password} className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} />
                    <Button onClick={this.handleRegisterSubmit} title="Register" isLoading={this.props.isLoading}/>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        );
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);