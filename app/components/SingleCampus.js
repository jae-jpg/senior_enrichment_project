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
        const students = this.state.students;
        const campuses = this.state.campuses;
        const campusId = parseInt(this.props.match.params.campusId);
        const campusStudents = students.filter(student => student.campusId === campusId);

        const thisCampus = campuses.find(campus => campus.id === campusId);

        return (
        <div className="component-container">
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={5000}
                transitionEnter={false}
                transitionLeave={false}>
                    {
                        thisCampus ? <h1>{thisCampus.name}</h1> : null
                    }
                    <ListStudents students={campusStudents} campuses={this.state.campuses}/>
                    <div>
                    <div className="spacer"> </div>
                    <div className="buttons-container">
                        <Link to="/main/new-student" className="button campus-button">Add a Student</Link>
                        <Link to={`/main/delete-campus/${campusId}`} className="button campus-button">Delete this Campus</Link>
                    </div>
                    </div>
            </ReactCSSTransitionGroup>
        </div>
        )
    }
}