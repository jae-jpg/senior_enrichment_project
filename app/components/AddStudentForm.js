'use strict'
import React, {Component} from 'react';
import store, {writeStudentName, createNewStudent} from '../store'
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

    handleChange(event){
        const name = event.target.value;
        store.dispatch(writeStudentName(name));   
    };

    handleSubmit(event){
        event.preventDefault();
        const campusId = event.target.campus.value;
        const name = this.state.studentInput;
        store.dispatch(createNewStudent({ name }, campusId));
        console.log('this props history:', this.props.history);
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
            </ReactCSSTransitionGroup>
        )
    }
}