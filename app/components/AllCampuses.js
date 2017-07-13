'use strict'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import store, {fetchCampuses} from '../store';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AllCampuses extends Component {
    constructor(){
        super();
        this.state = store.getState()
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    
    render(){
        const campuses = this.state.campuses;
        return (
            <div className="component-container">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={5000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <h1>All Campuses</h1>
                        <div>
                            {
                                campuses.map(campus => (
                                    <div key={campus.id}>
                                        <Link to={`/main/campuses/${campus.id}`}><h3>{campus.name}</h3></Link>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                        <Link to="/main/new-campus">Add a Campus</Link>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}