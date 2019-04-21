import React, { Component } from 'react';
import './header.scss';
import logo from '../../logo.png'

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <img src={logo} className="header__logo" alt="logo"/>
            </header>
        )
    }
}