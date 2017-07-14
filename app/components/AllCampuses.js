'use strict'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import store, {fetchCampuses, changeImage, changeImageId} from '../store';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AllCampuses extends Component {
    constructor(){
        super();
        this.state = store.getState()
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    
    handleMouseEnter(campus){
        console.log('image URL:', campus.imgURL);
        store.dispatch(changeImage(campus.imgURL));
        store.dispatch(changeImageId(campus.id));
    }

    handleMouseLeave(){
        console.log('mouse left');
        store.dispatch(changeImage(null));
        store.dispatch(changeImageId(null));
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
                                    this.state.currentImageId === campus.id ? 
                                    <div 
                                        onMouseEnter={(event) => this.handleMouseEnter(campus)}
                                        onMouseLeave={this.handleMouseLeave}
                                        key={campus.id}
                                        style={{
                                            backgroundImage: 'url(' + this.state.currentImage + ')',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: '100%'
                                        }}
                                    >
                                        <Link to={`/main/campuses/${campus.id}`}>
                                            <h3>{campus.name}</h3>
                                        </Link>
                                    </div> : 
                                    <div 
                                        onMouseEnter={(event) => this.handleMouseEnter(campus)}
                                        onMouseLeave={this.handleMouseLeave}
                                        key={campus.id}
                                    >
                                        <Link to={`/main/campuses/${campus.id}`}>
                                            <h3>{campus.name}</h3>
                                        </Link>
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