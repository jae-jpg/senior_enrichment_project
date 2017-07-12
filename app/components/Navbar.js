'use strict'
import React, {Component} from 'react';
import store from '../store';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
    render(){
        return (
            <div>
                <h1>Navbar</h1>
                <Link to="/main/students">Students</Link>
                <Link to="/main/campuses">Campuses</Link>
            </div>
        )
    }
}
