import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { searchManga }       from '../actions/postActions';

class Searchbar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value:''
  //   }
  // }

  handleEnter = (e) => {
    if(e.keyCode === 13){
      this.props.searchManga(e.target.value);
      };
  }

  render() {
    if(this.props.searched.length > 0){
      return <Redirect to={{
                pathname: '/search',
                state: { referrer: this.props.searched }

            }} push />;
    }
    return (
      <div>
        <h1>Searchbar</h1>
        <input type = "text" placeholder = "Search manga..." onKeyUp = {(ev) => this.handleEnter(ev)}/>
      </div>
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

export default connect( mapStateToProps, { searchManga } )(Searchbar);
