'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


import store, {fetchCampuses, fetchStudents} from '../store';
import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import ListStudents from './ListStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddStudentForm from './AddStudentForm';
import AddCampusForm from './AddCampusForm';
import DeleteCampus from './DeleteCampus'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Main extends Component {
    componentDidMount(){
        const campusesThunk = fetchCampuses();
        const studentsThunk = fetchStudents();
        store.dispatch(campusesThunk);
        store.dispatch(studentsThunk);
    }
    
    render(){
        return (
            <div>
                <Navbar />  
                <Switch>
                    <Route exact path="/main/campuses" component={AllCampuses}/>          
                    <Route exact path="/main/students" component={AllStudents}/>  
                    <Route path="/main/campuses/:campusId" component={SingleCampus}/>  
                    <Route path="/main/students/:studentId" component={SingleStudent}/>  
                    <Route path="/main/new-student" component={AddStudentForm}/>  
                    <Route path="/main/new-campus" component={AddCampusForm}/>
                    <Route path="/main/delete-campus/:campusId" component={DeleteCampus}/>
                    <Route path="/main/list-students" component={ListStudents}/> 
                </Switch>
            </div>
        )
    }
}