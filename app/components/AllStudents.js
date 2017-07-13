'use strict'
import React, {Component} from 'react';
import ListStudents from './ListStudents';
import store from '../store';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AllStudents extends Component {
    constructor(){
        super();
        this.state = store.getState();
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState())
        });
    };

    componentWillUnmount(){
        this.unsubscribe();
    }
    
    render(){
        return (
        <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={5000}
            transitionEnter={false}
            transitionLeave={false}>
            <div>
                <h1>All Students</h1>
                <ListStudents students={this.state.students} campuses={this.state.campuses}/>
            </div>
        </ReactCSSTransitionGroup>
        )
    }
}