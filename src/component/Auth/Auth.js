import React from 'react';
import { connect } from 'react-redux';
import { thunkChangeEmail, thunkChangePassword, thunkLogin } from '../../Redux/Reducers/AuthReducer';
import { withRouter } from 'react-router-dom';


class Auth extends React.Component {
    
    
    changeEmail = event => {
        this.props.thunkChangeEmail(event.target.value)
    }

    changePassword = event => {
        this.props.thunkChangePassword(event.target.value)
    }

    login = () => {
        const data = {
            email: this.props.auth.email,
            password: this.props.auth.password,
            returnSecureToken: true
        }
        this.props.thunkLogin(data)
        this.props.history.push('/') 
    }

    
    
    render() {
        return (
            <div className="auth">
                <div className='heading'>
                    <h1>Войдите в профиль</h1>
                </div>
                <div className="auth_block">
                    <label>Почта</label>
                    <input onChange={this.changeEmail}></input>
                </div>
                <div className="auth_block">
                    <label>Пароль</label>
                    <input type="password" onChange={this.changePassword}></input>
                </div>
                <button onClick={this.login}>Войти</button>    
            </div>
        )
    }   
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {thunkChangeEmail, thunkChangePassword, thunkLogin})(withRouter(Auth))