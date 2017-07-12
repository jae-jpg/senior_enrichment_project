import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import store, {writeStudentName, updateStudent, selectCampus} from '../store';

export default class ListStudents extends Component {
    
    constructor(){
        super();
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);
        this.handleCampusClick = this.handleCampusClick.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
    }

    // HANDLERS FOR ~*NAME*~ CHANGE AND SUBMITE
    handleNameChange(event){
        store.dispatch(writeStudentName(event.target.value));
    }

    handleNameClick(event, student){
        if (student.editNameMode === 'Done') {
            const name = store.getState().studentInput;
            store.dispatch(updateStudent(student.id, name));
        }
        student.editNameMode === 'Edit' ? student.editNameMode = 'Done' : student.editNameMode = 'Edit';
        this.forceUpdate();
    }

    // HANDLERS FOR ~*NAME*~ CHANGE AND SUBMITE
    handleCampusChange(event){
        const campusId = parseInt(event.target.value);
        store.dispatch(selectCampus(campusId));
    }

    handleCampusClick(event, student){
        if (student.editCampusMode === 'Done') {
            const campusId = store.getState().selectedCampusId;
            store.dispatch(updateStudent(student.id, null, campusId))
        }
        student.editCampusMode === 'Edit' ? student.editCampusMode = 'Done' : student.editCampusMode = 'Edit';
        this.forceUpdate();
    }

    render() {
        const students = this.props.students;
        const campuses = this.props.campuses;
        const handleNameClick = this.handleNameClick;
        const handleNameChange = this.handleNameChange;
        const handleCampusChange = this.handleCampusChange;
        const handleCampusClick = this.handleCampusClick;

        const editableStudents = students.map(student => {
            student.editNameMode = student.editNameMode || 'Edit';
            student.editCampusMode = student.editCampusMode || 'Edit';
            return student;
        });

        const findCampus = function(student){
            return campuses.find(campus => campus.id === student.campusId);
        };

        return (
            <div>
                <h1>Students</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Number</th>
                                <th>Name</th>
                                <th>House</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map(function(student){
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>
                                                {
                                                    student.editNameMode === 'Edit' ?
                                                    student.name :
                                                    <input onChange={handleNameChange}></input>
                                                }
                                                
                                                <button
                                                    value={student.id}
                                                    onClick={(event) => handleNameClick(event, student)}>
                                                    {student.editNameMode}
                                                </button>
                                            </td>
                                            <td>
                                                {
                                                    student.editCampusMode === 'Edit' ?
                                                    findCampus(student).name :
                                                    <select onChange={handleCampusChange}>
                                                        {
                                                            campuses.map(campus => (
                                                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                }
                                                
                                                <button onClick={(event) => handleCampusClick(event, student)}>{student.editCampusMode}</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


// OLD STUDENTS BLOCK
                            // {
                            //     students.map(student => (
                            //         <tr key={student.id}>
                            //             <td>
                            //                 {student.id}
                            //             </td>
                            //             <td>
                            //                 {
                            //                     !this.state.editNameMode ? 
                            //                         (<Link to={`/main/students/${student.id}`}>{student.name}</Link>) :
                            //                         <input name="name" onChange={this.handleNameChange}></input>
                            //                 }
                            //                 {
                            //                     !this.state.editNameMode ?
                            //                     (<button name="edit-name" onClick={this.handleNameClick}>Edit</button>) :
                            //                     (<button name="edit-name" onClick={this.handleNameClick}>Done</button>)
                            //                 }                                        
                            //             </td>
                            //             <td>
                            //                 {
                            //                     !this.state.editCampusMode ? 
                            //                     (<Link to={`/main/campuses/${findCampus(student).id}`}>{findCampus(student).name}</Link>) :
                            //                     <select name="campus" onChange={this.handleCampusChange}>
                            //                         <option key="1" value="1">Test Option 1</option>
                            //                         <option key="2" value="2">Test Option 2</option>
                            //                         {
                            //                             campuses.map(campus => {
                            //                                 <option key={campus.id}>{campus.name}</option>
                            //                             })
                            //                         }
                            //                     </select>

                            //                 }
                            //                 {
                            //                     !this.state.editCampusMode ?
                            //                     (<button name="edit-campus" onClick={this.handleCampusClick}>Edit</button>) :
                            //                     (<button name="edit-campus" onClick={this.handleCampusClick}>Done</button>)
                            //                 }
                            //             </td>
                            //         </tr>
                            //     ))
                            // }