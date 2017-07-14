import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import store, {writeStudentName, updateStudent, selectCampus, deleteStudent} from '../store';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class ListStudents extends Component {
    
    constructor(){
        super();
        this.state = store.getState();
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);
        this.handleCampusClick = this.handleCampusClick.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentDidMount(){
        this.unsubcribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    };

    componentWillUnmount(){
        this.unsubcribe();
    }

    // HANDLERS FOR ~*NAME*~ CHANGE AND SUBMITE
    handleNameChange(event){
        store.dispatch(writeStudentName(event.target.value));
    }

    handleNameClick(event, student){
        if (student.editNameMode === 'Done') {
            const name = store.getState().studentInput;
            store.dispatch(updateStudent(student.id, name));
            this.forceUpdate();
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
            this.forceUpdate();
        }
        student.editCampusMode === 'Edit' ? student.editCampusMode = 'Done' : student.editCampusMode = 'Edit';
        this.forceUpdate();
    }

    handleDeleteClick(event, student){
        store.dispatch(deleteStudent(student.id))
    }


    render() {
        const jsxVariable = <div></div>
        const students = this.props.students;
        const campuses = this.props.campuses;
        const handleNameClick = this.handleNameClick;
        const handleNameChange = this.handleNameChange;
        const handleCampusChange = this.handleCampusChange;
        const handleCampusClick = this.handleCampusClick;
        const handleDeleteClick = this.handleDeleteClick;

        const editableStudents = students.map(student => {
            student.editNameMode = student.editNameMode || 'Edit';
            student.editCampusMode = student.editCampusMode || 'Edit';
            return student;
        }).sort(function(a,b){
            return a.id - b.id;
        });

        const findCampus = function(student){
            return campuses.find(campus => campus.id === student.campusId);
        };

        const campusField = function(student){
            return findCampus(student) ?
            <Link to={`/main/campuses/${findCampus(student).id}`}>{findCampus(student).name}</Link> :
            <Link to={`/main/students/${student.id}`}>Choose a Campus</Link>;
        };

        return (
        <div className="component-container">
            {
                editableStudents.length ? (
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={5000}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <div className="containerTable">
                            <div className="containerRow" id="header">
                                <div className="col-1">ID</div>
                                <div className="col-2">Name</div>
                                <div className="col-3"></div>
                                <div className="col-4">House</div>
                                <div className="col-5"></div>
                                <div className="col-6"></div>
                            </div>
                            {
                                editableStudents.map(function(student){
                                    return (
                                        <div className="containerRow" key={student.id}>
                                            <div className="col-1">{student.id}</div>
                                            <div className="col-2">
                                                {
                                                    student.editNameMode === 'Edit' ?
                                                    <Link to={`/main/students/${student.id}`}>{student.name}</Link> :
                                                    <input onChange={handleNameChange}></input>
                                                }
                                            </div>
                                            <div className="col-3">
                                                <button
                                                    value={student.id}
                                                    onClick={(event) => handleNameClick(event, student)}>
                                                    {student.editNameMode}
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                {
                                                    student.editCampusMode === 'Edit' ?
                                                    campusField(student) :
                                                    <select onChange={handleCampusChange}>
                                                        {
                                                            campuses.map(campus => (
                                                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                }
                                            </div>
                                            <div className="col-5">
                                                <button
                                                    onClick={(event) => handleCampusClick(event, student)}>
                                                    {student.editCampusMode}
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button
                                                    className="btn btn-default btn-xs"
                                                    onClick={(event) => handleDeleteClick(event, student)}>
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </ReactCSSTransitionGroup>
                ) : null
            }
        </div>
        )
    }
}