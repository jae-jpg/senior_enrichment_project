'use strict'
import React, {Component} from 'react';
import store, {writeStudentName, createNewStudent} from '../store'

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

    handleChange(event){
        const name = event.target.value;
        store.dispatch(writeStudentName(name));   
    };

    handleSubmit(event){
        event.preventDefault();
        const campusId = event.target.campus.value;
        const name = this.state.newStudentInput;
        store.dispatch(createNewStudent({ name }, campusId));
    }
    
    render(){
        const campuses = this.state.campuses;
        return (
            <div>
                <h1>Add a Student</h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} />
                    <select name="campus">
                        {
                            campuses.map(campus => (
                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                            ))
                        }
                    </select>
                    <button type="Submit">Submit</button>
                </form>
            </div>
        )
    }
}