'use strict'
import React, {Component} from 'react';
import store from '../store';
import {Link} from 'react-router-dom';

export default class LandingPage extends Component {
    render(){
        return (
            <div>
                <div id="welcome">
                    <p>The Sorting Hat</p>
                </div>
                <Link to="/main/students">Students</Link>
                <Link to="/main/campuses">Campuses</Link>
            </div>
        )
    }
}