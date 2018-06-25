import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withRouter }       from "react-router-dom";
import { searchManga, fetchSuggestion }      from '../actions/postActions';
import Suggest              from './suggestManga';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      term: ''
    }
  }

  // static contextTypes = {
  //     router: PropTypes.object
  //   }
  handleEnter = (e) => {
    // this.props.fetchSuggestion(e.target.value, function(){ console.log('done') })
    this.setState({term:e.target.value}, function() {
      if(this.state.term.length > 2){
        console.log('fetchSuggestion');
        this.props.fetchSuggestion(this.state.term, function(){ console.log('done') })
      } else {
        console.log('Do not fetch for suggestion');
      }
    })
    if(e.keyCode === 13){
      this.setState({value:e.target.value})
      this.props.searchManga(e.target.value, () => {

        console.log(this.props.history);
        this.props.history.push("/search?q="+this.state.value);
      });
      };
  }



  render() {
    return (
      <Fragment>
        <input className="search-input" type = "text" placeholder = "Search manga..." onKeyUp = {(ev) => this.handleEnter(ev)}/>
        <Suggest term = {this.state.term} {...this.props}/>
      </Fragment>
    )
  }
}

Searchbar.propTypes = {
  searchManga: PropTypes.func.isRequired,
  fetchSuggestion: PropTypes.func.isRequired,
  searched: PropTypes.array
}

const mapStateToProps = state => ({
  searched : state.posts.searched,
  suggestion: state.posts.suggestion
})

export default connect( mapStateToProps, { searchManga, fetchSuggestion } )(withRouter(Searchbar));
