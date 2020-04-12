import React from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import {today} from './../../Data/dates'


const Menu = () => ( 

    <div className='menu'>
        <div className='logo'>Logo</div>
        <ul>
            <li><NavLink to={`/tasks/${today}`}>Мой день</NavLink></li>
            <li><NavLink to='/questions'>Вопросы</NavLink></li>           
        </ul>
    </div>
)


export default Menu