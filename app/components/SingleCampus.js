'use strict'
import React, {Component} from 'react';
import ListStudents from './ListStudents';
import store from '../store';
import {Link} from 'react-router-dom';

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
            <div>
                <h1>Single Campus</h1>
                <ListStudents students={campusStudents} campuses={this.state.campuses}/>
                <div>
                    <p>Use this div for additional details about the campus!!!</p>
                </div>
            </div>
        )
    }
}

// OLD RENDER RETURN
        // return (
        //     <div>
        //         <h1>Students</h1>
        //         <div>
        //             <table>
        //                 <thead>
        //                     <tr>
        //                         <th>ID Number</th>
        //                         <th>Name</th>
        //                         <th>House</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {
        //                         campusStudents.map(student => (
        //                             <tr key={student.id}>
        //                                 <td>{student.id}</td>
        //                                 <td><Link to={`/main/students/${student.id}`}>{student.name}</Link></td>
        //                                 <td>House</td>
        //                             </tr>
        //                         ))
        //                     }
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // )