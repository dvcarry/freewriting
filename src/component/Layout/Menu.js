import React from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { today } from './../../Data/dates'
import { connect } from 'react-redux';


const Menu = props => (

    <div className='menu'>
        <div className="menu_left">
            <div className='logo'>
                <NavLink to='/'>Logo</NavLink>
            </div>
            <ul>
                <li><NavLink to={`/tasks/${today}`}>Мой день</NavLink></li>
                <li><NavLink to='/questions'>Вопросы</NavLink></li>
            </ul>
        </div>
        <div className="menu_right">
            <ul>
                <li><NavLink to='/admin'>Админ</NavLink></li>
                {
                    props.auth.login
                        ? <li>{props.auth.email}</li>
                        : <li><NavLink to='/auth'>Войти</NavLink></li>
                }
               
            </ul>
        </div>

    </div>
)

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Menu) 