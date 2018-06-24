import React, { Component } from "react";
import MangaList from "../components/mangaList";
import Searchbar from "../components/searchbar";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchManga, fetchPopular }       from '../actions/postActions';

class Main extends Component {
  componentWillMount() {
    this.props.fetchManga();
    this.props.fetchPopular();
  }
  render() {
    // console.log(this.props);
    return (
      <div className = "whole-app">
        <Searchbar {...this.props}/>
        <h1>Popular manga</h1>
        <MangaList mangaArray = {this.props.popular}/>
        <h1>Other titles</h1>
        <MangaList mangaArray = {this.props.listManga.manga}/>
      </div>
    )
  }
}

Main.propTypes = {
  fetchManga    : PropTypes.func.isRequired,
  fetchPopular  : PropTypes.func.isRequired,
  listManga     : PropTypes.object,
  popular       : PropTypes.array
}

const mapStateToProps = state => ({
  listManga : state.posts.listManga,
  popular   : state.posts.popular,
  searched : state.posts.searched
})

export default connect( mapStateToProps, { fetchManga, fetchPopular } )(Main);
















// import React, { Component } from "react";
// import MangaList from "../components/mangaList";
// import PropTypes            from 'prop-types';
// import { connect }          from 'react-redux';
// import { fetchManga }       from '../actions/postActions';
//
// class Main extends Component {
// 	componentWillMount () {
// 			this.props.fetchManga();
// 	}
//
// 	render() {
// 		return (
// 			<div>
// 				<h1>Manga App</h1>
// 				<button onClick={() => console.log(this.props.listManga)}>
// 					Check state of manga array
// 				</button>
//
// 			<MangaList mangaArray={this.props.listManga.manga} />
// 			</div>
// 		);
// 	}
// }
//
// Main.propTypes = {
//   fetchManga  : PropTypes.func.isRequired,
//   listManga       : PropTypes.object,
// }
//
// const mapStateToProps = state => ({
//   listManga   : state.posts.listManga
// });
//
// export default connect(mapStateToProps, { fetchManga })(Main);
