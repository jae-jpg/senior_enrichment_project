'use strict'
import React, {Component} from 'react';
import ListStudents from './ListStudents';
import store from '../store';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SingleCampus extends Component {
    constructor(props){
        super(props);
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
        const campusId = parseInt(this.props.match.params.campusId);
        const students = this.state.students;
        const campusStudents = students.filter(student => student.campusId === campusId);

        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={5000}
                transitionEnter={false}
                transitionLeave={false}>
                <div>
                    <h1>Single Campus</h1>
                    <ListStudents students={campusStudents} campuses={this.state.campuses}/>
                    <div>
                    <h3>Delete this Campus</h3>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}