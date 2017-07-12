'use strict'
import React, {Component} from 'react';
import ListStudents from './ListStudents';
import store from '../store';
import {Link} from 'react-router-dom';

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
            <div>
                <h1>Single Student</h1>
                <ListStudents students={singleStudent} campuses={this.state.campuses}/>
                <div>
                    <p>Use this div for additional details about the student!!!</p>
                </div>
            </div>
        )
    }
}