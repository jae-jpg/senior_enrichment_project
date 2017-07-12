'use strict'
import React, {Component} from 'react';
import store, {writeCampusName, createNewCampus} from '../store'

export default class AddCampus extends Component {
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
        store.dispatch(writeCampusName(name));   
    };

    handleSubmit(event){
        event.preventDefault();
        const name = this.state.newCampusInput;
        const imgUrl = event.target.imgUrl.value;
        store.dispatch(createNewCampus(name, imgUrl));
    }
    
    render(){
        return (
            <div>
                <h1>Add a Campus</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input name="name" onChange={this.handleChange} />
                    <label>Link to Image</label>
                    <input name="imgUrl"/>
                    <button type="Submit">Submit</button>
                </form>
            </div>
        )
    }
}