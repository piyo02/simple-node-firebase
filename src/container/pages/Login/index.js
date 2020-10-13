import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';

import Button from '../../../component/atoms/Button';

class Login extends Component {
    state ={
        email: '',
        password: '',
    }
    
    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const {email, password} = this.state;
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if(res){
            console.log("login success")
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: '',
            })
            history.push('/');
        }else {
            console.log("login failed")
        }
        
    }
    render() {
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input value={this.state.email} className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} />
                    <input value={this.state.password} className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} />
                    <Button onClick={this.handleLoginSubmit} title="Register" isLoading={this.props.isLoading}/>
                </div>
            </div>
        );
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);