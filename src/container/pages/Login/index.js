import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionUsername } from '../../../config/redux/action';

class Login extends Component {
    changeUser = () => {
        this.props.changeUsername()
    }

    render() {
        return(
            <div>
                <p>Login Page {this.props.username}</p>
                <button onClick={this.changeUser}>Change Username</button>
                <button>Go to Dashboard</button>
            </div>
        );
    }
}

const reduxState = (state) => ({
    popupProps: state.popup,
    username: state.user
})

const reduxDispatch = (dispatch) => ({
    changeUsername: () => dispatch(actionUsername())
})

export default connect(reduxState, reduxDispatch)(Login);