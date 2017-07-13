'use strict'
import React, {Component} from 'react';
import ListStudents from './ListStudents';
import store from '../store';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SingleStudent extends Component {
    constructor(){
        super();
        this.state = store.getState();
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    };

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const studentId = parseInt(this.props.match.params.studentId);
        const students = this.state.students;
        const singleStudent = students.filter(student => student.id === studentId);
        
        return (
            <div className="component-container">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={5000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <h1>Single Student</h1>
                        <ListStudents students={singleStudent} campuses={this.state.campuses}/>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}