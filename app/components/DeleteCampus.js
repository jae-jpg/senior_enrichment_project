import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import store, {deleteCampus} from '../store';

export default class DeleteCampus extends Component {
  constructor(){
    super();
    this.state = store.getState();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState);
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  handleClick(event, campusId){
    store.dispatch(deleteCampus(campusId))
    this.props.history.push('/main/campuses');
  }

  render() {

    const campusId = parseInt(this.props.match.params.campusId);
    const campuses = this.state.campuses;
    const thisCampus = campuses.find(function(campus) {
      return campus.id === campusId;
    })

      return (
        <div className="component-container">
          {
            thisCampus ? <h1>Are you sure you want to delete: {thisCampus.name}?</h1> : null
          }
          <div className="buttons-container">
              <button onClick={event => this.handleClick(event, campusId)} className="button delete-button">Yes</button>
              <Link to={`/main/campuses/${campusId}`} className="button delete-button">No, go back</Link>
          </div>
        </div>
      )
  }

}
