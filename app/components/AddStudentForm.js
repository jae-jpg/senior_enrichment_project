'use strict'
import React, {Component} from 'react';
import store, {writeStudentName, createNewStudent, writeStudentEmail} from '../store'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AddStudentForm extends Component {
    constructor(){
        super();
        this.state = store.getState()
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        })
    };

    componentWillUnmount(){
        this.unsubscribe();
    };

    handleNameChange(event){
        const name = event.target.value;
        store.dispatch(writeStudentName(name));   
    };

    handleEmailChange(event){
        const email = event.target.value;
        store.dispatch(writeStudentEmail(email));
    }

    handleSubmit(event){
        event.preventDefault();
        const campusId = event.target.campus.value;
        const name = this.state.studentInput;
        const email = this.state.emailInput;
        const student = {name, email}
        store.dispatch(createNewStudent(student, campusId));
        this.props.history.push(`/main/campuses/${campusId}`)
    }
    
    render(){
        const campuses = this.state.campuses;
        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={5000}
                transitionEnter={false}
                transitionLeave={false}>
                <div>
                    <h1>Add a Student</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="new-instance">
                            <input className="new-instance-box" placeholder="Enter a Student Name" onChange={this.handleNameChange} />
                            <input className="new-instance-box" placeholder="Enter a Student Email" onChange={this.handleEmailChange}/>
                            <select className="new-instance-box" name="campus">
                                {
                                    campuses.map(campus => (
                                        <option key={campus.id} value={campus.id}>{campus.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type="Submit">Submit</button>
                    </form>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}