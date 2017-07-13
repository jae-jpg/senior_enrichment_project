import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

// DEFINE INITIAL STATE
const initialState = {
    students: [],
    campuses: [],
    studentInput: '',
    campusInput: '',
    selectedCampusId: 0
}

// ACTIONS
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const CREATE_NEW_STUDENT = 'CREATE_NEW_STUDENT';
const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';


// ACTION CREATORS
export function getStudents(studentsArray){
    const action = {type: GET_STUDENTS, students: studentsArray}
    return action;
};

export function getCampuses(campusesArray){
    const action = {type: GET_CAMPUSES, campuses: campusesArray}
    return action;
};

export function writeStudentName(studentName){
    const action = {type: CREATE_NEW_STUDENT, studentName: studentName}
    return action;
};

export function writeCampusName(campusName){
    const action = {type: WRITE_CAMPUS_NAME, campusName: campusName}
    return action;
}

export function selectCampus(campusId){
    const action = {type: SELECT_CAMPUS, campusId: campusId}
    return action;
}

export function removeStudent(studentId){
    const action = {type: REMOVE_STUDENT, studentId: studentId}
    return action;
}

// THUNK CREATORS
export function fetchStudents(){
    return function thunk(dispatch){
        axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            const action = getStudents(students);
            dispatch(action);
        })
        .catch(err => {console.log(err)});
    }
}

export function fetchCampuses() {
    return function thunk(dispatch){
        axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
            const action = getCampuses(campuses);
            dispatch(action);
        })
        .catch(err => {console.log(err)});
    };
};

export function createNewStudent(student, campusId){
    return function thunk(dispatch){
        axios.post('/api/students', {student, campusId})
        .then(res => res.data)
        .then(newStudent => {
            dispatch(fetchStudents());
            console.log(newStudent);
        })
        .catch(err => {console.log(err)});
    };
};

export function createNewCampus(name, imgUrl){
    return function thunk(dispatch){
        axios.post('/api/campuses', {name, imgURL: imgUrl})
        .then(res => res.data)
        .then(newCampus => {
            dispatch(fetchCampuses())
            console.log('newCampus', newCampus);
        })
        .catch(err => {console.log(err)});
    };
};

export function updateStudent(studentId, newName, newCampus){ // newName will be received from the action created in the click handler
    console.log('testing put:', newName, newCampus);
    return function thunk(dispatch){
        axios.put(`/api/students/${studentId}`, {newName, newCampus}) // THIS WILL SEND AS THE PAYLOAD TO SERVER SIDE API LINE 64
        .then(res => res.data)
        .then(updatedStudent => {
            dispatch(fetchStudents());
            console.log('updated student:', updatedStudent)
        })
        .catch(err => {console.log(err)});
    };
};

export function deleteStudent(studentId){
    return function thunk(dispatch){
        axios.delete(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(result => {
            alert('Student deleted.');
        })
        .catch(err => {console.log(err)});
    };
};

export function deleteCampus(campusId){
    return function thunk(dispatch){
        axios.delete(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(result => {
            dispatch(fetchCampuses());
            alert('Campus deleted.');
        })
        .catch(err => {console.log(err)});
    };
};

const reducer = function(state = initialState, action){
    
    switch(action.type){
        case GET_STUDENTS:
            return Object.assign({}, state, {students: action.students});
        case GET_CAMPUSES:
            return Object.assign({}, state, {campuses: action.campuses});
        case CREATE_NEW_STUDENT:
            return Object.assign({}, state, {studentInput: action.studentName});
        case WRITE_CAMPUS_NAME:
            return Object.assign({}, state, {campusInput: action.campusName});
        case SELECT_CAMPUS:
            return Object.assign({}, state, {selectedCampusId: action.campusId});
        case REMOVE_STUDENT:
            const studentsArr = state.students.filter(student => student.id !== action.studentId);
            return Object.assign({}, state, {students: studentsArr});
        default:
            return state;
    }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
