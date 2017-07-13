'use strict'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
    render(){
        return (
            <nav>
                <ul className='container containerNav'>
                    <li className="boxNav"><Link to="/">Home</Link></li>
                    <li className="boxNav"><Link to="/main/students">Students</Link></li>
                    <li className="boxNav"><Link to="/main/campuses">Campuses</Link></li>
                    <li className="boxNav"><Link to="/main/new-student">Add a Student</Link></li>
                </ul>
            </nav>
        )
    }
}