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
        const singleStudent = students.filter(function(student){
            return student.id === studentId
        });

        console.log('single student', singleStudent);
        
        return (
            <div className="component-container">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={5000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    {
                        singleStudent.length ? 
                        <div>
                            <h1>{singleStudent[0].name}</h1>
                            <ListStudents students={singleStudent} campuses={this.state.campuses}/>
                            <div className="spacer"> </div>
                            <div className="buttons-container">
                                <a href={`mailto:${singleStudent[0].email}`} className="button campus-button">Email this Student</a>
                            </div>
                        </div> : null
                    }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}