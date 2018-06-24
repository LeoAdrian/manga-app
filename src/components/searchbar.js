import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { withRouter }       from "react-router-dom";
import { searchManga }       from '../actions/postActions';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }

  // static contextTypes = {
  //     router: PropTypes.object
  //   }
  handleEnter = (e) => {
    if(e.keyCode === 13){
      this.setState({value:e.target.value})
      this.props.searchManga(e.target.value, () => {

        console.log(this.props.history);
        this.props.history.push("/search?q="+this.state.value);
      });
      };
  }

  // componentWillUnmount() {
  //   console.log('Unmounting');
  //   this.props.toggleSearchState(this.props.search);
  //   // this.props.search = false;
  // }

  render() {
    // if(this.state.value){
    //   return <Redirect to={{
    //             pathname: '/search',
    //             search: `/term?q=${this.state.value}`,
    //             state: { referrer: this.props.searched }
    //
    //         }}/>;
    // }
    return (
      <Fragment>
        <input className="search-input" type = "text" placeholder = "Search manga..." onKeyUp = {(ev) => this.handleEnter(ev)}/>
      </Fragment>
    )
  }
}

Searchbar.propTypes = {
  searchManga: PropTypes.func.isRequired,
  searched: PropTypes.array
}

const mapStateToProps = state => ({
  searched : state.posts.searched
})

export default connect( mapStateToProps, { searchManga } )(withRouter(Searchbar));
